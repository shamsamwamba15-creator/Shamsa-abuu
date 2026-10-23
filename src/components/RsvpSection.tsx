import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2, Search, Utensils, Music, MessageSquare, UserPlus, Send, Phone, Mail } from 'lucide-react';
import { GuestRsvp } from '../types/wedding';
import { WeddingStorage } from '../services/storage';

interface RsvpSectionProps {
  onSuccess?: () => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'submit' | 'lookup'>('submit');

  // RSVP Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'accepted' | 'declined'>('accepted');
  const [hasPlusOne, setHasPlusOne] = useState(false);
  const [plusOneName, setPlusOneName] = useState('');
  const [mealChoice, setMealChoice] = useState<'lamb_biryani' | 'swahili_pilau' | 'grilled_fish' | 'vegetarian' | 'kids'>('lamb_biryani');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [message, setMessage] = useState('');

  // Lookup state
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupResult, setLookupResult] = useState<GuestRsvp | null | 'not_found'>(null);

  // Feedback State
  const [submittedGuest, setSubmittedGuest] = useState<GuestRsvp | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 95,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#768e77', '#bcc8bc', '#d7c6a9', '#f5efe3', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    const saved = WeddingStorage.addOrUpdateGuest({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      status,
      plusOne: hasPlusOne,
      plusOneName: hasPlusOne ? plusOneName.trim() : undefined,
      mealChoice,
      dietaryRestrictions: dietaryRestrictions.trim() || undefined,
      songRequest: songRequest.trim() || undefined,
      message: message.trim() || undefined,
    });

    setSubmittedGuest(saved);
    if (status === 'accepted') {
      triggerCelebration();
    }
    if (onSuccess) onSuccess();
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupEmail.trim()) return;

    const guests = WeddingStorage.getGuests();
    const found = guests.find((g) => g.email.toLowerCase() === lookupEmail.trim().toLowerCase());

    if (found) {
      setLookupResult(found);
      setFullName(found.fullName);
      setEmail(found.email);
      setPhone(found.phone || '');
      setStatus(found.status === 'declined' ? 'declined' : 'accepted');
      setHasPlusOne(found.plusOne);
      setPlusOneName(found.plusOneName || '');
      setMealChoice(found.mealChoice);
      setDietaryRestrictions(found.dietaryRestrictions || '');
      setSongRequest(found.songRequest || '');
      setMessage(found.message || '');
    } else {
      setLookupResult('not_found');
    }
  };

  const resetForm = () => {
    setSubmittedGuest(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setStatus('accepted');
    setHasPlusOne(false);
    setPlusOneName('');
    setDietaryRestrictions('');
    setSongRequest('');
    setMessage('');
    setLookupResult(null);
  };

  return (
    <section id="rsvp" className="py-24 px-4 relative z-10 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="font-arabic text-3xl sm:text-4xl text-[#768e77] block mb-1">
          تأكيد الحضور
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1d2c20] font-normal mb-3">
          Kindly RSVP
        </h2>
        <div className="w-16 h-0.5 bg-[#d7c6a9] mx-auto mb-4" />
        <p className="text-[#587059] text-sm sm:text-base font-light mb-6">
          Please confirm your attendance for the Nikah celebration on 11th December 2026. Your presence and prayers mean the world to us.
        </p>

        {/* Direct Contact Banner */}
        <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-around gap-3 text-xs mb-8 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f0f4f0] flex items-center justify-center text-[#768e77]">
              <Phone className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[#587059] block text-[10px] uppercase font-semibold">Call or WhatsApp</span>
              <a href="tel:+255769285957" className="text-[#1d2c20] hover:text-[#768e77] font-semibold text-sm transition">
                +255 769285957
              </a>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-[#d7c6a9] hidden sm:block" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#f0f4f0] flex items-center justify-center text-[#768e77]">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="text-[#587059] block text-[10px] uppercase font-semibold">Email RSVP</span>
              <a href="mailto:shamsamwamba15@gmail.com" className="text-[#1d2c20] hover:text-[#768e77] font-semibold text-sm transition">
                shamsamwamba15@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="inline-flex rounded-full bg-[#f4efe3] p-1 border border-[#d7c6a9]">
          <button
            type="button"
            onClick={() => {
              setActiveTab('submit');
              setSubmittedGuest(null);
            }}
            className={`px-5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
              activeTab === 'submit'
                ? 'bg-[#768e77] text-white font-medium shadow-sm'
                : 'text-[#587059] hover:text-[#1d2c20]'
            }`}
          >
            Submit RSVP
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('lookup')}
            className={`px-5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
              activeTab === 'lookup'
                ? 'bg-[#768e77] text-white font-medium shadow-sm'
                : 'text-[#587059] hover:text-[#1d2c20]'
            }`}
          >
            Check / Update Status
          </button>
        </div>
      </div>

      {/* Lookup Tab Card */}
      {activeTab === 'lookup' && (
        <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-3xl p-6 sm:p-8 backdrop-blur-xl mb-12 shadow-lg">
          <h3 className="font-serif text-xl sm:text-2xl text-[#1d2c20] mb-2">Look Up Your Existing RSVP</h3>
          <p className="text-xs sm:text-sm text-[#587059] mb-6">
            Enter the email address used during RSVP to review or adjust your response and meal preferences.
          </p>
          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={lookupEmail}
              onChange={(e) => setLookupEmail(e.target.value)}
              placeholder="e.g. shamsamwamba15@gmail.com"
              className="flex-1 bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-4 py-3 text-[#1d2c20] text-sm outline-none transition"
              required
            />
            <button
              type="submit"
              className="bg-[#768e77] hover:bg-[#587059] text-white font-medium px-6 py-3 rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search RSVP</span>
            </button>
          </form>

          {lookupResult === 'not_found' && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              No RSVP found for <span className="font-semibold">{lookupEmail}</span>. Switch to "Submit RSVP" above to register your attendance!
            </div>
          )}

          {lookupResult && lookupResult !== 'not_found' && (
            <div className="mt-6 p-5 rounded-2xl bg-[#f0f4f0] border border-[#bcc8bc] text-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-lg text-[#1d2c20] font-medium">{lookupResult.fullName}</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold uppercase ${
                    lookupResult.status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {lookupResult.status === 'accepted' ? 'Attending' : 'Declined'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#587059] mb-4">
                <p>Email: <span className="text-[#1d2c20] font-medium">{lookupResult.email}</span></p>
                <p>Meal: <span className="capitalize text-[#1d2c20] font-medium">{lookupResult.mealChoice.replace('_', ' ')}</span></p>
                <p>Plus One: <span className="text-[#1d2c20] font-medium">{lookupResult.plusOne ? lookupResult.plusOneName || 'Yes' : 'No'}</span></p>
                {lookupResult.dietaryRestrictions && <p>Dietary: {lookupResult.dietaryRestrictions}</p>}
                {lookupResult.songRequest && <p>Nasheed/Melody: "{lookupResult.songRequest}"</p>}
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('submit')}
                className="text-xs text-[#768e77] hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                Edit these details in the form &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* Confirmation View after Successful Submission */}
      {submittedGuest ? (
        <div className="bg-[#ffffff] border border-[#768e77] rounded-3xl p-8 sm:p-10 text-center shadow-xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#f0f4f0] border border-[#768e77] flex items-center justify-center mx-auto mb-4 text-[#768e77]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="font-arabic text-2xl text-[#768e77] mb-1">
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>
          <h3 className="font-serif text-3xl text-[#1d2c20] mb-2">
            {submittedGuest.status === 'accepted' ? 'Alhamdulillah! We Are Delighted to Have You' : 'Thank You for Your Blessings'}
          </h3>
          <p className="text-[#587059] text-sm max-w-md mx-auto mb-6">
            Your RSVP has been saved for <strong className="text-[#1d2c20]">{submittedGuest.fullName}</strong>. We look forward to seeing you at Ubungo Plaza A, Dar es Salaam!
          </p>

          <div className="inline-block bg-[#fbf8f2] border border-[#d7c6a9] rounded-2xl p-5 text-left text-xs max-w-sm w-full mb-8 space-y-1.5 text-[#2e4031]">
            <p className="text-[#768e77] font-semibold text-sm mb-2">Reservation Summary</p>
            <p>Status: <span className="capitalize font-medium text-[#1d2c20]">{submittedGuest.status}</span></p>
            <p>Entrée: <span className="capitalize font-medium text-[#1d2c20]">{submittedGuest.mealChoice.replace('_', ' ')}</span></p>
            {submittedGuest.plusOne && <p>Plus One: <span className="font-medium text-[#1d2c20]">{submittedGuest.plusOneName || 'Guest'}</span></p>}
            {submittedGuest.songRequest && <p>Nasheed/Melody: <span className="font-medium text-[#1d2c20] italic">"{submittedGuest.songRequest}"</span></p>}
          </div>

          <div>
            <button
              type="button"
              onClick={resetForm}
              className="bg-[#f5efe3] hover:bg-[#e5ece5] border border-[#d7c6a9] text-[#1d2c20] font-medium text-xs px-6 py-2.5 rounded-full transition cursor-pointer"
            >
              Submit Another Response or Modify
            </button>
          </div>
        </div>
      ) : (
        /* RSVP Submission Form */
        <div className="bg-[#ffffff] border border-[#d7c6a9] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Attendance Choice Buttons */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1d2c20] mb-3">
                Will you be attending the Nikah? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('accepted')}
                  className={`py-3.5 px-4 rounded-2xl border text-sm font-medium transition cursor-pointer flex items-center justify-center gap-2 ${
                    status === 'accepted'
                      ? 'bg-[#768e77] text-white border-[#768e77] shadow-sm font-semibold'
                      : 'bg-[#fbf8f2] border-[#d7c6a9] text-[#587059] hover:bg-[#f5efe3]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${status === 'accepted' ? 'fill-[#d7c6a9] text-[#d7c6a9]' : ''}`} />
                  <span>Joyfully Accept with Du’a</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('declined')}
                  className={`py-3.5 px-4 rounded-2xl border text-sm font-medium transition cursor-pointer flex items-center justify-center gap-2 ${
                    status === 'declined'
                      ? 'bg-[#f5efe3] text-[#1d2c20] border-[#d7c6a9] shadow-sm font-semibold'
                      : 'bg-[#fbf8f2] border-[#d7c6a9] text-[#587059] hover:bg-[#f5efe3]'
                  }`}
                >
                  <span>Regretfully Decline (With Best Wishes)</span>
                </button>
              </div>
            </div>

            {/* Guest Primary Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#2e4031] font-medium mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Shamsa Mwamba"
                  required
                  className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-4 py-2.5 text-[#1d2c20] text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs text-[#2e4031] font-medium mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. shamsamwamba15@gmail.com"
                  required
                  className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-4 py-2.5 text-[#1d2c20] text-sm outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#2e4031] font-medium mb-1.5">Mobile Phone (e.g. +255 769285957)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+255 769285957"
                className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-4 py-2.5 text-[#1d2c20] text-sm outline-none transition"
              />
            </div>

            {/* Plus One Toggle */}
            {status === 'accepted' && (
              <div className="p-4 rounded-2xl bg-[#f0f4f0] border border-[#bcc8bc] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-[#768e77]" />
                    <span className="text-sm font-medium text-[#1d2c20]">Attending with Spouse or Plus-One?</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasPlusOne}
                      onChange={(e) => setHasPlusOne(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#bcc8bc] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#768e77]"></div>
                  </label>
                </div>

                {hasPlusOne && (
                  <div className="pt-2 animate-in fade-in">
                    <label className="block text-xs text-[#2e4031] font-medium mb-1.5">Plus-One Full Name</label>
                    <input
                      type="text"
                      value={plusOneName}
                      onChange={(e) => setPlusOneName(e.target.value)}
                      placeholder="e.g. Juma Mwamba"
                      className="w-full bg-[#ffffff] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-4 py-2 text-[#1d2c20] text-sm outline-none transition"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Halal Banquet Entrée Selection */}
            {status === 'accepted' && (
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1d2c20] mb-2 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-[#768e77]" />
                  <span>Halal Banquet Selection</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    { id: 'lamb_biryani', title: 'Royal Lamb Biryani', desc: 'Slow-braised spiced lamb & saffron basmati' },
                    { id: 'swahili_pilau', title: 'Swahili Spiced Chicken Pilau', desc: 'Aromatic clove, cardamom & kachumbari' },
                    { id: 'grilled_fish', title: 'Coastal Spiced Fish', desc: 'Tamarind coconut glaze & plantains' },
                    { id: 'vegetarian', title: 'Garden Truffle Pilau', desc: 'Wild mushroom & roasted vegetables (Vegan)' },
                  ].map((meal) => (
                    <div
                      key={meal.id}
                      onClick={() => setMealChoice(meal.id as any)}
                      className={`p-3 rounded-2xl border cursor-pointer transition ${
                        mealChoice === meal.id
                          ? 'border-[#768e77] bg-[#f0f4f0] shadow-sm'
                          : 'border-[#d7c6a9] bg-[#ffffff] hover:border-[#bcc8bc]'
                      }`}
                    >
                      <span className="font-serif font-semibold text-sm text-[#1d2c20] block mb-0.5">
                        {meal.title}
                      </span>
                      <span className="text-[11px] text-[#587059] block leading-tight">{meal.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-3">
                  <label className="block text-xs text-[#2e4031] font-medium mb-1">
                    Dietary Requirements or Allergies
                  </label>
                  <input
                    type="text"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="e.g. Gluten-free, nut allergy, strictly vegetarian"
                    className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-4 py-2 text-[#1d2c20] text-xs outline-none transition"
                  />
                </div>
              </div>
            )}

            {/* Nasheed / Melody Request */}
            <div>
              <label className="block text-xs text-[#2e4031] font-medium mb-1 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#768e77]" />
                <span>Nasheed or Melody Suggestion for the Reception</span>
              </label>
              <input
                type="text"
                value={songRequest}
                onChange={(e) => setSongRequest(e.target.value)}
                placeholder="e.g. Maher Zain, Sami Yusuf, acoustic oud or traditional Taraab..."
                className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-4 py-2.5 text-[#1d2c20] text-sm outline-none transition"
              />
            </div>

            {/* Du'a / Message to Couple */}
            <div>
              <label className="block text-xs text-[#2e4031] font-medium mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#768e77]" />
                <span>Du’a & Message for Aysha & Kalimah</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Write your prayers and warm wishes for the bride and groom..."
                className="w-full bg-[#fbf8f2] border border-[#d7c6a9] focus:border-[#768e77] rounded-xl px-4 py-2.5 text-[#1d2c20] text-sm outline-none transition resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#768e77] hover:bg-[#587059] text-white font-medium py-3.5 rounded-2xl shadow-md hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Confirm & Send RSVP</span>
              </button>
              <p className="text-center text-[11px] text-[#587059] mt-2">
                Need direct assistance? Call/WhatsApp <strong className="text-[#1d2c20]">+255 769285957</strong> or email <strong className="text-[#1d2c20]">shamsamwamba15@gmail.com</strong>
              </p>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
