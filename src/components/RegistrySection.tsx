import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, ExternalLink, CheckCircle2, Sparkles, X } from 'lucide-react';
import { RegistryItem } from '../types/wedding';
import { WeddingStorage } from '../services/storage';

export const RegistrySection: React.FC = () => {
  const [items, setItems] = useState<RegistryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'charity' | 'honeymoon' | 'home' | 'experience'>('all');
  const [contributingItem, setContributingItem] = useState<RegistryItem | null>(null);

  // Contribution Modal Form State
  const [contributionAmount, setContributionAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [contributionSuccess, setContributionSuccess] = useState(false);

  const loadRegistry = () => {
    setItems(WeddingStorage.getRegistry());
  };

  useEffect(() => {
    loadRegistry();
    const handleUpdate = () => loadRegistry();
    window.addEventListener('wedding_registry_updated', handleUpdate);
    window.addEventListener('wedding_all_reset', handleUpdate);
    return () => {
      window.removeEventListener('wedding_registry_updated', handleUpdate);
      window.removeEventListener('wedding_all_reset', handleUpdate);
    };
  }, []);

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleStartContribute = (item: RegistryItem) => {
    setContributingItem(item);
    setContributionAmount(100);
    setCustomAmount('');
    setContributorName('');
    setGiftMessage('');
    setContributionSuccess(false);
  };

  const handleConfirmContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributingItem) return;

    const amount = customAmount ? parseFloat(customAmount) : contributionAmount;
    if (isNaN(amount) || amount <= 0) return;

    WeddingStorage.contributeToRegistry(contributingItem.id, amount);

    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#768e77', '#bcc8bc', '#d7c6a9', '#fbf8f2'],
      });
    } catch {
      // safe fallback
    }

    setContributionSuccess(true);
    loadRegistry();
  };

  return (
    <section id="registry" className="py-24 px-4 relative z-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-arabic text-3xl sm:text-4xl text-[#768e77] block mb-1">صندوق الخير والبركة</span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1d2c20] font-normal mb-3">
          Gift Registry & Sadaqah Jariyah
        </h2>
        <div className="w-16 h-0.5 bg-[#d7c6a9] mx-auto mb-4" />
        <p className="text-[#587059] text-sm sm:text-base font-light">
          Your presence and heartfelt prayers at our Nikah are the greatest gift. Should you wish to honor our new home, we have designated Sadaqah Jariyah initiatives and honeymoon adventures.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {[
            { id: 'all', label: 'All Blessings' },
            { id: 'charity', label: 'Sadaqah Jariyah' },
            { id: 'honeymoon', label: 'Honeymoon & Retreat' },
            { id: 'home', label: 'Home & Keepsakes' },
            { id: 'experience', label: 'Tanzanian Experiences' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
                selectedCategory === tab.id
                  ? 'bg-[#768e77] text-white font-semibold shadow-sm'
                  : 'bg-[#ffffff] border border-[#d7c6a9] text-[#587059] hover:bg-[#f5efe3]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Registry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const percent = Math.min(100, Math.round((item.currentAmount / item.targetAmount) * 100));
          const isFunded = item.currentAmount >= item.targetAmount;

          return (
            <div
              key={item.id}
              className="bg-[#ffffff] border border-[#d7c6a9] hover:border-[#768e77] rounded-3xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-[#d7c6a9] text-[#587059] text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  {item.category === 'charity' ? 'Sadaqah Jariyah' : item.category}
                </span>
                {item.storeName && (
                  <span className="absolute top-3 right-3 bg-[#f5efe3] text-[#1d2c20] text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#d7c6a9]">
                    {item.storeName}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xl text-[#1d2c20] font-medium mb-2 group-hover:text-[#768e77] transition">
                    {item.title}
                  </h4>
                  <p className="text-[#587059] text-xs leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#1d2c20] font-medium">
                      ${item.currentAmount.toLocaleString()} <span className="text-[#768e77]">of ${item.targetAmount.toLocaleString()}</span>
                    </span>
                    <span className={`font-semibold ${isFunded ? 'text-[#768e77]' : 'text-[#c5a976]'}`}>
                      {percent}% {isFunded && '• Complete!'}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#f0f4f0] overflow-hidden mb-5 border border-[#bcc8bc]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFunded ? 'bg-[#768e77]' : 'bg-[#768e77]'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartContribute(item)}
                      className="flex-1 bg-[#768e77] hover:bg-[#587059] text-white font-medium text-xs py-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Gift className="w-3.5 h-3.5 text-[#d7c6a9]" />
                      <span>{isFunded ? 'Send Du’a' : 'Contribute Gift'}</span>
                    </button>

                    {item.externalLink && (
                      <a
                        href={item.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl border border-[#d7c6a9] bg-[#f5efe3] hover:bg-[#e5ece5] text-[#1d2c20] transition cursor-pointer flex items-center justify-center"
                        title={`View on ${item.storeName || 'Store'}`}
                      >
                        <ExternalLink className="w-4 h-4 text-[#768e77]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contribution Modal */}
      {contributingItem && (
        <div className="fixed inset-0 z-50 bg-[#1d2c20]/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setContributingItem(null)}
              className="absolute top-4 right-4 text-[#587059] hover:text-[#1d2c20] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {contributionSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#f0f4f0] border border-[#768e77] flex items-center justify-center mx-auto mb-4 text-[#768e77]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-[#1d2c20] mb-2">Jazakallahu Khayran!</h3>
                <p className="text-xs text-[#587059] max-w-xs mx-auto mb-6">
                  Your generous gift towards <strong className="text-[#1d2c20]">{contributingItem.title}</strong> has been recorded. Aysha & Kalimah cherish your love and prayers!
                </p>
                <button
                  type="button"
                  onClick={() => setContributingItem(null)}
                  className="bg-[#768e77] text-white font-medium text-xs px-6 py-2.5 rounded-full cursor-pointer shadow-sm"
                >
                  Return to Registry
                </button>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#768e77] font-semibold block mb-1">
                  Gift Contribution
                </span>
                <h3 className="font-serif text-2xl text-[#1d2c20] font-medium mb-1">
                  {contributingItem.title}
                </h3>
                <p className="text-xs text-[#587059] mb-6">
                  Select an amount or enter a custom contribution to bless the newlyweds.
                </p>

                <form onSubmit={handleConfirmContribution} className="space-y-4">
                  {/* Preset amounts */}
                  <div>
                    <label className="block text-xs text-[#1d2c20] font-medium mb-2">Select Amount</label>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {[50, 100, 200, 300].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setContributionAmount(amt);
                            setCustomAmount('');
                          }}
                          className={`py-2 rounded-xl text-xs font-semibold border cursor-pointer transition ${
                            contributionAmount === amt && !customAmount
                              ? 'bg-[#768e77] text-white border-[#768e77]'
                              : 'bg-[#fbf8f2] border-[#d7c6a9] text-[#1d2c20] hover:bg-[#f5efe3]'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#587059] text-xs">$</span>
                      <input
                        type="number"
                        min="5"
                        max="10000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Or enter custom amount..."
                        className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl pl-7 pr-4 py-2 text-[#1d2c20] text-xs outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#1d2c20] font-medium mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={contributorName}
                      onChange={(e) => setContributorName(e.target.value)}
                      placeholder="e.g. Aunt Fatima & Uncle Rashid"
                      required
                      className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-3.5 py-2 text-[#1d2c20] text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#1d2c20] font-medium mb-1">Du’a / Note</label>
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      rows={2}
                      placeholder="May Allah shower endless barakah upon your home..."
                      className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-3.5 py-2 text-[#1d2c20] text-xs outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#768e77] hover:bg-[#587059] text-white font-medium py-3 rounded-xl text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#d7c6a9]" />
                      <span>
                        Pledge ${customAmount ? customAmount : contributionAmount} & Send Wishes
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
