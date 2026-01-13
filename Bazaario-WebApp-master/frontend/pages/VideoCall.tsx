
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, MessageSquare, ShoppingBag, Receipt, Plus, X, Check, ArrowRight, Wallet } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { InvoiceItem } from '../types';
import DailyIframe from '@daily-co/daily-js';
import { api } from '../services/api';

const VideoCall: React.FC = () => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId?: string }>();
  const { user, sendInvoice, currentInvoice, acceptInvoice, clearInvoice } = useStore();
  
  // Call State
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [status, setStatus] = useState('Connecting...');
  const [callDuration, setCallDuration] = useState(0);

  // Daily.co call frame
  const callFrameRef = useRef<any>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Seller: Invoice Form State
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([{ name: '', price: 0, quantity: 1 }]);

  // Buyer: Invoice Notification State
  const [showBuyerInvoice, setShowBuyerInvoice] = useState(false);

  const handleEndCall = (shouldNavigate: boolean = true) => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    if (callFrameRef.current) {
      callFrameRef.current.leave().catch(console.error);
      callFrameRef.current.destroy().catch(console.error);
      callFrameRef.current = null;
    }
    clearInvoice();
    if (shouldNavigate) {
      navigate('/dashboard');
    }
  };

  // Initialize video call
  useEffect(() => {
    let isMounted = true;
    
    const initializeCall = async () => {
      try {
        // Clean up any existing frame first
        if (callFrameRef.current) {
          try {
            await callFrameRef.current.destroy();
          } catch (e) {
            console.log('Error destroying existing frame:', e);
          }
          callFrameRef.current = null;
        }
        
        if (!isMounted) return;
        
        setStatus('Connecting...');
        
        // Generate a room ID based on store ID so both seller and customer join the same room
        // If storeId is provided, use it. Otherwise, create a generic room.
        // For sellers, they should use their store ID. For customers, they get it from the URL.
        const roomId = storeId 
          ? `store-${storeId}` 
          : user?.role === 'seller' 
            ? `store-${user.id}` // Seller uses their user ID as store ID
            : `bazaario-room-${Date.now()}`; // Fallback for generic calls
        
        // Fetch room token from backend
        const roomData = await api.getVideoCallRoom(roomId);
        
        if (!isMounted) return;
        
        if (!roomData || !roomData.url) {
          throw new Error('Failed to get room URL');
        }

        // Make sure the container element exists
        if (!remoteVideoRef.current) {
          throw new Error('Video container not found');
        }

        // Create Daily.co call frame
        const callFrame = DailyIframe.createFrame(
          remoteVideoRef.current,
          {
            showLeaveButton: false,
            showFullscreenButton: true,
            showLocalVideo: true,
            iframeStyle: {
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: 'none',
            },
          }
        );

        if (!isMounted) {
          callFrame.destroy().catch(console.error);
          return;
        }

        callFrameRef.current = callFrame;

        // Set up event listeners
        let hasJoined = false;
        
        callFrame.on('joined-meeting', () => {
          if (!isMounted) return;
          hasJoined = true;
          setStatus('Connected');
          // Start duration timer
          const startTime = Date.now();
          if (durationIntervalRef.current) {
            clearInterval(durationIntervalRef.current);
          }
          durationIntervalRef.current = setInterval(() => {
            if (!isMounted) return;
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            setCallDuration(elapsed);
          }, 1000);
        });

        callFrame.on('left-meeting', (event: any) => {
          console.log('Left meeting event:', event);
          // Only navigate away if we actually joined and it's not a connection error
          if (hasJoined && isMounted) {
            handleEndCall(true);
          }
        });

        callFrame.on('error', (error: any) => {
          console.error('Daily.co error:', error);
          if (!isMounted) return;
          // Don't navigate on error, just show error message
          setStatus('Connection Error');
        });

        callFrame.on('participant-left', (event: any) => {
          console.log('Participant left:', event);
          // Don't end call when participant leaves, just log it
        });

        // Join the call
        await callFrame.join({
          url: roomData.url,
          userName: user?.name || 'User',
          startVideoOff: !camOn,
          startAudioOff: !micOn,
        });

      } catch (error: any) {
        if (!isMounted) return;
        console.error('Error initializing call:', error);
        const errorMessage = error?.message || 'Unknown error';
        console.error('Full error details:', error);
        setStatus(`Failed to connect: ${errorMessage}`);
      }
    };

    initializeCall();

    // Cleanup on unmount
    return () => {
      isMounted = false;
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
      if (callFrameRef.current) {
        // Only destroy if component is actually unmounting (not just re-rendering)
        callFrameRef.current.leave().catch(() => {});
        callFrameRef.current.destroy().catch(console.error);
        callFrameRef.current = null;
      }
    };
  }, []); // Empty deps - only run once on mount

  // Listen for incoming invoice (Buyer side)
  useEffect(() => {
    if (currentInvoice && user?.role === 'customer') {
      setShowBuyerInvoice(true);
    }
  }, [currentInvoice, user]);

  const toggleMic = () => {
    const newMicState = !micOn;
    setMicOn(newMicState);
    if (callFrameRef.current) {
      callFrameRef.current.setLocalAudio(newMicState);
    }
  };

  const toggleCamera = () => {
    const newCamState = !camOn;
    setCamOn(newCamState);
    if (callFrameRef.current) {
      callFrameRef.current.setLocalVideo(newCamState);
    }
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // --- Seller Logic ---
  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, { name: '', price: 0, quantity: 1 }]);
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceItems];
    if (field === 'price' || field === 'quantity') {
       newItems[index] = { ...newItems[index], [field]: Number(value) };
    } else {
       newItems[index] = { ...newItems[index], [field]: value as string };
    }
    setInvoiceItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const handleSendInvoice = () => {
    // Validate
    const validItems = invoiceItems.filter(i => i.name && i.price > 0);
    if (validItems.length === 0) return;

    sendInvoice(validItems, user?.name || 'Seller');
    setShowInvoiceForm(false);
    // In a real app, seller would see "Waiting for payment" status
  };

  // --- Buyer Logic ---
  const handleCheckout = () => {
    acceptInvoice(); // Adds to cart
    navigate('/checkout');
  };

  const handleSimulateInvoice = () => {
     // For demo purposes: Simulate seller sending an invoice while user is logged in as buyer
     sendInvoice([
        { name: 'Red Banarasi Saree', price: 2500, quantity: 1 },
        { name: 'Matching Blouse Piece', price: 500, quantity: 1 }
     ], 'Ramesh Textiles');
  };

  return (
    <div className="h-screen w-full bg-slate-900 relative overflow-hidden flex flex-col font-sans">
      
      {/* Remote Video */}
      <div className="flex-1 relative" ref={remoteVideoRef}>
         {/* Daily.co iframe will be inserted here */}
         {status === 'Connecting...' && (
           <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
             <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
               <p className="text-white text-lg">Connecting to video call...</p>
             </div>
           </div>
         )}
         
         {/* Call Header */}
         <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start z-10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg border-2 border-white/20">
                {user?.role === 'seller' ? 'C' : 'R'}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight text-shadow">
                  {user?.role === 'seller' ? 'Aditi Verma (Customer)' : 'Ramesh Textiles'}
                </h3>
                <p className="text-white/80 text-xs flex items-center gap-1.5 font-medium">
                   <span className={`w-2 h-2 rounded-full ${status === 'Connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-yellow-500'}`}></span>
                   {status}
                </p>
              </div>
           </div>
           <div className="bg-black/40 backdrop-blur-xl px-4 py-1.5 rounded-full text-white text-sm font-mono border border-white/10 shadow-lg">
             {formatDuration(callDuration)}
           </div>
         </div>
      </div>

      {/* Local Video (PiP) - Daily.co iframe handles this internally, but we keep this for custom styling if needed */}
      {/* The local video is shown within the Daily.co iframe by default */}

      {/* --- SELLER UI: Invoice Form Modal --- */}
      {showInvoiceForm && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
           <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                 <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Receipt size={20} className="text-primary" /> Generate Invoice
                 </h2>
                 <button onClick={() => setShowInvoiceForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                 <div className="space-y-4">
                    {invoiceItems.map((item, index) => (
                       <div key={index} className="flex gap-2 items-start">
                          <div className="flex-1 space-y-2">
                             <input 
                               type="text" 
                               placeholder="Item Name (e.g., Red Saree)"
                               value={item.name}
                               onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                               className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border-none focus:ring-2 focus:ring-primary dark:text-white"
                             />
                             <div className="flex gap-2">
                               <input 
                                 type="number" 
                                 placeholder="Price"
                                 value={item.price || ''}
                                 onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                 className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border-none focus:ring-2 focus:ring-primary dark:text-white"
                               />
                               <input 
                                 type="number" 
                                 placeholder="Qty"
                                 value={item.quantity}
                                 onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                 className="w-20 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border-none focus:ring-2 focus:ring-primary dark:text-white"
                               />
                             </div>
                          </div>
                          {invoiceItems.length > 1 && (
                            <button onClick={() => handleRemoveItem(index)} className="mt-3 p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                               <X size={18} />
                            </button>
                          )}
                       </div>
                    ))}
                    <button onClick={handleAddItem} className="w-full py-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 font-bold text-sm hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                       <Plus size={16} /> Add Another Item
                    </button>
                 </div>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-500 font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                       ₹ {invoiceItems.reduce((acc, i) => acc + (i.price * i.quantity), 0)}
                    </span>
                 </div>
                 <button 
                   onClick={handleSendInvoice}
                   className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all flex items-center justify-center gap-2"
                 >
                    Send Invoice to Buyer <ArrowRight size={20} />
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* --- BUYER UI: Invoice Received Notification --- */}
      {showBuyerInvoice && currentInvoice && (
        <div className="absolute inset-x-0 bottom-32 z-50 px-4 animate-slide-up">
           <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 ring-4 ring-black/5">
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg text-white">
                       <Receipt size={24} />
                    </div>
                    <div className="text-white">
                       <h3 className="font-bold leading-tight">Bill Generated</h3>
                       <p className="text-primary-light text-xs opacity-90">from {currentInvoice.storeName}</p>
                    </div>
                 </div>
                 <span className="text-white font-mono font-bold text-xl">₹{currentInvoice.total}</span>
              </div>
              
              <div className="p-6">
                 <ul className="space-y-3 mb-6">
                    {currentInvoice.items.map((item, i) => (
                       <li key={i} className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2 last:border-0 last:pb-0">
                          <span className="text-slate-600 dark:text-slate-300">
                             {item.quantity}x <span className="font-semibold text-slate-900 dark:text-white">{item.name}</span>
                          </span>
                          <span className="font-medium text-slate-900 dark:text-white">₹{item.price * item.quantity}</span>
                       </li>
                    ))}
                 </ul>
                 <button 
                    onClick={handleCheckout}
                    className="w-full py-3.5 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-600/30 hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                 >
                    <Wallet size={20} /> Pay Now & Checkout
                 </button>
                 <button 
                    onClick={() => setShowBuyerInvoice(false)}
                    className="w-full mt-3 py-2 text-slate-500 text-sm font-medium hover:text-slate-700 dark:hover:text-slate-300"
                 >
                    Review Later
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Demo: Simulation Button for Customer Role */}
      {user?.role === 'customer' && !currentInvoice && (
          <div className="absolute top-24 right-4 z-20">
             <button 
               onClick={handleSimulateInvoice}
               className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-white/20 transition-all"
             >
                🔮 Demo: Simulate Seller Bill
             </button>
          </div>
      )}

      {/* Controls Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 z-40">
        <button 
          onClick={toggleMic} 
          className={`p-4 rounded-full shadow-lg backdrop-blur-md transition-all ${micOn ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' : 'bg-red-500 text-white border-transparent'}`}
        >
          {micOn ? <Mic size={24} /> : <MicOff size={24} />}
        </button>

        <button 
          onClick={toggleCamera} 
          className={`p-4 rounded-full shadow-lg backdrop-blur-md transition-all ${camOn ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' : 'bg-red-500 text-white border-transparent'}`}
        >
          {camOn ? <VideoIcon size={24} /> : <VideoOff size={24} />}
        </button>

        <button 
          onClick={handleEndCall} 
          className="p-5 rounded-full bg-red-600 text-white shadow-xl hover:bg-red-700 transform hover:scale-110 transition-all ring-4 ring-red-500/30"
        >
          <PhoneOff size={28} />
        </button>

        {/* Dynamic Action Button based on Role */}
        {user?.role === 'seller' ? (
           <button 
             onClick={() => setShowInvoiceForm(true)}
             className="p-4 rounded-full bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/40 backdrop-blur-md transition-all relative transform hover:-translate-y-1"
             title="Generate Invoice"
           >
             <Receipt size={24} />
           </button>
        ) : (
           <button 
             onClick={() => navigate('/checkout')}
             className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 shadow-lg backdrop-blur-md transition-all"
             title="View Cart"
           >
             <ShoppingBag size={24} />
           </button>
        )}

        <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 border border-white/10 shadow-lg backdrop-blur-md transition-all">
          <MessageSquare size={24} />
        </button>
      </div>
      
    </div>
  );
};

export default VideoCall;
