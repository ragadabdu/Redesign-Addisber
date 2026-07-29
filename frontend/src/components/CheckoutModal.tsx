import React, { useState } from 'react';
import type { CartItem, Order } from '../types';
import { X, CheckCircle, Smartphone, CreditCard, Banknote, ShieldCheck, Truck, PackageCheck } from 'lucide-react';
import { VISA_LOGO, MASTERCARD_LOGO } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [fullName, setFullName] = useState('Yonas Alemu');
  const [phone, setPhone] = useState('0911234567');
  const [city, setCity] = useState('Addis Ababa');
  const [subcity, setSubcity] = useState('Bole');
  const [addressNotes, setAddressNotes] = useState('Near Edna Mall, Building 4B');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'chapa' | 'cod' | 'card'>('telebirr');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + deliveryFee;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `AB-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cartItems],
      total,
      fullName,
      phone,
      city,
      subcity,
      paymentMethod,
      status: 'Processing',
    };
    setCompletedOrder(newOrder);
    setStep('success');
    onClearCart();
  };

  const handleCloseSuccess = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#c3c6d2] relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 bg-[#003874] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FFD200]" />
            <h2 className="text-lg font-bold">
              {step === 'details' ? 'Complete Your Order' : 'Order Confirmed!'}
            </h2>
          </div>
          <button
            onClick={step === 'success' ? handleCloseSuccess : onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 'details' ? (
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              {/* Delivery Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#003874] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#1A4F95]" /> Delivery Address (Ethiopia)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#424751] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#c3c6d2] text-sm outline-none focus:border-[#1A4F95]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#424751] mb-1">Phone Number (+251)</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0911234567"
                      className="w-full px-3 py-2 rounded-lg border border-[#c3c6d2] text-sm outline-none focus:border-[#1A4F95]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#424751] mb-1">City</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#c3c6d2] text-sm outline-none focus:border-[#1A4F95] bg-white cursor-pointer"
                    >
                      <option value="Addis Ababa">Addis Ababa</option>
                      <option value="Hawassa">Hawassa</option>
                      <option value="Adama">Adama</option>
                      <option value="Bahir Dar">Bahir Dar</option>
                      <option value="Dire Dawa">Dire Dawa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#424751] mb-1">Subcity / District</label>
                    <select
                      value={subcity}
                      onChange={(e) => setSubcity(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#c3c6d2] text-sm outline-none focus:border-[#1A4F95] bg-white cursor-pointer"
                    >
                      <option value="Bole">Bole</option>
                      <option value="Kazanchis">Kazanchis</option>
                      <option value="Kirkos">Kirkos</option>
                      <option value="Yeka">Yeka</option>
                      <option value="Arada">Arada</option>
                      <option value="Nifas Silk">Nifas Silk</option>
                      <option value="Kolfe Keranio">Kolfe Keranio</option>
                      <option value="Gullele">Gullele</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#424751] mb-1">Street Landmark / Specific Directions</label>
                  <input
                    type="text"
                    value={addressNotes}
                    onChange={(e) => setAddressNotes(e.target.value)}
                    placeholder="e.g. Near Edna Mall, House No. 12"
                    className="w-full px-3 py-2 rounded-lg border border-[#c3c6d2] text-sm outline-none focus:border-[#1A4F95]"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-3 border-t border-[#e2e2e8]">
                <h3 className="text-sm font-bold text-[#003874] uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-[#1A4F95]" /> Select Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Telebirr */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === 'telebirr'
                        ? 'border-[#1A4F95] bg-[#1A4F95]/5 shadow-xs'
                        : 'border-[#c3c6d2] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="radio"
                        name="payment"
                        value="telebirr"
                        checked={paymentMethod === 'telebirr'}
                        onChange={() => setPaymentMethod('telebirr')}
                        className="text-[#1A4F95]"
                      />
                      <Smartphone className="w-5 h-5 text-[#1A4F95]" />
                    </div>
                    <div className="mt-2">
                      <span className="block font-bold text-sm text-[#003874]">telebirr</span>
                      <span className="text-[10px] text-[#737782]">Instant Mobile Pay</span>
                    </div>
                  </label>

                  {/* CBE Birr */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === 'cbe'
                        ? 'border-[#1A4F95] bg-[#1A4F95]/5 shadow-xs'
                        : 'border-[#c3c6d2] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="radio"
                        name="payment"
                        value="cbe"
                        checked={paymentMethod === 'cbe'}
                        onChange={() => setPaymentMethod('cbe')}
                        className="text-[#1A4F95]"
                      />
                      <span className="text-xs font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">CBE</span>
                    </div>
                    <div className="mt-2">
                      <span className="block font-bold text-sm text-[#003874]">CBE Birr</span>
                      <span className="text-[10px] text-[#737782]">Bank Account / Mobile</span>
                    </div>
                  </label>

                  {/* Chapa / Card */}
                  <label
                    className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                      paymentMethod === 'chapa'
                        ? 'border-[#1A4F95] bg-[#1A4F95]/5 shadow-xs'
                        : 'border-[#c3c6d2] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <input
                        type="radio"
                        name="payment"
                        value="chapa"
                        checked={paymentMethod === 'chapa'}
                        onChange={() => setPaymentMethod('chapa')}
                        className="text-[#1A4F95]"
                      />
                      <div className="flex gap-1">
                        <img src={VISA_LOGO} alt="Visa" className="h-3" />
                        <img src={MASTERCARD_LOGO} alt="Mastercard" className="h-3" />
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="block font-bold text-sm text-[#003874]">Chapa / Card</span>
                      <span className="text-[10px] text-[#737782]">Visa, Mastercard, Local</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-[#f3f3fa] p-4 rounded-xl border border-[#e2e2e8] space-y-2 text-xs">
                <div className="flex justify-between text-[#424751]">
                  <span>Items ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span className="font-semibold text-[#1a1c20]">ETB {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#424751]">
                  <span>Delivery ({city}, {subcity})</span>
                  <span className="font-semibold text-emerald-700">
                    {deliveryFee === 0 ? 'FREE' : `ETB ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#003874] pt-2 border-t border-[#c3c6d2]">
                  <span>Total Amount</span>
                  <span>ETB {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-[#FFD200] hover:bg-[#ecc200] text-[#0D1117] font-extrabold text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <PackageCheck className="w-5 h-5" />
                <span>Confirm Order (ETB {total.toLocaleString()})</span>
              </button>
            </form>
          ) : (
            /* Order Success View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Ameseginalehu! (Thank You)</span>
                <h3 className="text-2xl font-bold text-[#003874] mt-1">Your Order has been Placed</h3>
                <p className="text-sm text-[#737782] mt-1">
                  Tracking Reference: <strong className="text-[#1A4F95] font-mono">{completedOrder?.id}</strong>
                </p>
              </div>

              {/* Delivery details card */}
              <div className="bg-[#f3f3fa] p-5 rounded-xl border border-[#e2e2e8] text-left space-y-3 max-w-md mx-auto text-xs text-[#424751]">
                <div className="flex justify-between border-b border-[#c3c6d2]/60 pb-2">
                  <span className="font-bold text-[#003874]">Estimated Delivery:</span>
                  <span className="font-semibold text-emerald-700">Today by 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Recipient:</span>
                  <span className="font-semibold text-[#1a1c20]">{completedOrder?.fullName} ({completedOrder?.phone})</span>
                </div>
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-semibold text-[#1a1c20]">{completedOrder?.subcity}, {completedOrder?.city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-semibold uppercase text-[#1A4F95]">{completedOrder?.paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-[#c3c6d2]/60 pt-2 font-bold text-sm text-[#003874]">
                  <span>Total Paid:</span>
                  <span>ETB {completedOrder?.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCloseSuccess}
                  className="px-8 py-3 bg-[#1A4F95] text-white font-bold rounded-xl hover:bg-[#003874] transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
