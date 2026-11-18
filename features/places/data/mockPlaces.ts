import type { Place } from '@/types/place';

export const mockPlaces: Place[] = [
  {
    id: 'shaniwar-wada',
    name: 'Shaniwar Wada',
    category: 'Culture',
    city: 'Pune',
    area: 'Shaniwar Peth',
    address: 'Shaniwar Peth, Pune, Maharashtra',
    description:
      'A landmark in the heart of Pune, with open grounds and layers of Maratha-era history to explore at your own pace.',
    image: require('../../../assets/images/places/aga-khan-palace.jpg'),
    goodFor: 'History, architecture and a slow afternoon',
    bestTime: 'Earlier in the day',
    notes: [
      {
        author: 'A weekend visitor',
        note: 'Give yourself time to wander beyond the main entrance and take in the scale of the grounds.',
        occasion: 'A relaxed afternoon',
      },
    ],
  },
  {
    id: 'vetal-tekdi',
    name: 'Vetal Tekdi',
    category: 'Outdoors',
    city: 'Pune',
    area: 'Pashan',
    address: 'Pashan, Pune, Maharashtra',
    description:
      'A leafy hill trail that offers a change of pace from the city, with several paths for a short walk or a longer climb.',
    image: require('../../../assets/images/places/okayama-garden.jpg'),
    goodFor: 'A morning walk and open-air views',
    bestTime: 'Early morning',
    notes: [
      {
        author: 'A local walker',
        note: 'Comfortable shoes and a little extra water make the walk more enjoyable.',
        occasion: 'A morning outdoors',
      },
    ],
  },
  {
    id: 'aga-khan-palace',
    name: 'Aga Khan Palace',
    category: 'Culture',
    city: 'Pune',
    area: 'Kalyani Nagar',
    address: 'Pune Nagar Road, Kalyani Nagar, Pune',
    description:
      'A spacious heritage site with quiet gardens and a meaningful place in India’s independence story.',
    image: require('../../../assets/images/places/aga-khan-palace.jpg'),
    goodFor: 'Architecture, history and quiet gardens',
    bestTime: 'Late morning',
    notes: [
      {
        author: 'A visiting family',
        note: 'The grounds are a lovely place to slow down after exploring the exhibits.',
        occasion: 'A cultural day out',
      },
    ],
  },
  {
    id: 'cafe-peter',
    name: 'Cafe Peter',
    category: 'Food & drink',
    city: 'Pune',
    area: 'Koregaon Park',
    address: 'Koregaon Park, Pune, Maharashtra',
    description:
      'An easygoing cafe stop for coffee, a casual bite and an unhurried catch-up.',
    image: require('../../../assets/images/places/cafe-peter.jpg'),
    goodFor: 'Coffee and an easy catch-up',
    bestTime: 'Late morning',
    notes: [
      {
        author: 'A coffee break',
        note: 'A comfortable pick when you want to sit down and take a break from the neighbourhood.',
        occasion: 'A casual meet-up',
      },
    ],
  },
  {
    id: 'empress-garden',
    name: 'Empress Garden',
    category: 'Outdoors',
    city: 'Pune',
    area: 'Camp',
    address: 'Kavade Mala, Ghorpadi, Pune',
    description:
      'A green city garden with room to stroll, find a patch of shade and spend an easy hour outside.',
    image: require('../../../assets/images/places/pataleshwar.jpg'),
    goodFor: 'A relaxed walk and a little greenery',
    bestTime: 'Morning or late afternoon',
    notes: [
      {
        author: 'A garden visitor',
        note: 'A nice change of scenery when you want a slower, outdoorsy plan.',
        occasion: 'A quiet weekend',
      },
    ],
  },
  {
    id: 'pataleshwar-cave-temple',
    name: 'Pataleshwar Cave Temple',
    category: 'Culture',
    city: 'Pune',
    area: 'Shivajinagar',
    address: 'Jangali Maharaj Road, Shivajinagar, Pune',
    description:
      'A rock-cut temple tucked into the city, with striking carved stone and a calm courtyard.',
    image: require('../../../assets/images/places/aga-khan-palace.jpg'),
    goodFor: 'A short cultural stop',
    bestTime: 'Morning',
    notes: [
      {
        author: 'A city explorer',
        note: 'A peaceful pause just off one of the city’s busier roads.',
        occasion: 'Exploring central Pune',
      },
    ],
  },
  {
    id: 'pashan-lake',
    name: 'Pashan Lake',
    category: 'Outdoors',
    city: 'Pune',
    area: 'Pashan',
    address: 'Pashan, Pune, Maharashtra',
    description:
      'An open-air spot for a quiet walk and a slower start to the day on Pune’s western side.',
    image: require('../../../assets/images/places/shaniwar-wada.jpg'),
    goodFor: 'Birdwatching and an early walk',
    bestTime: 'Early morning',
    notes: [
      {
        author: 'A morning regular',
        note: 'The quieter hours are a good time to take in the surroundings.',
        occasion: 'Before the day gets busy',
      },
    ],
  },
  {
    id: 'pune-okayama-garden',
    name: 'Pune-Okayama Friendship Garden',
    category: 'Outdoors',
    city: 'Pune',
    area: 'Dattawadi',
    address: 'Sinhagad Road, Dattawadi, Pune',
    description:
      'A Japanese-inspired garden with winding paths, water and carefully shaped greenery.',
    image: require('../../../assets/images/places/okayama-garden.jpg'),
    goodFor: 'A peaceful walk and garden views',
    bestTime: 'Morning',
    notes: [
      {
        author: 'A garden visitor',
        note: 'Take the paths slowly; the small details are part of the experience.',
        occasion: 'A calm afternoon',
      },
    ],
  },
  {
    id: 'the-flour-works',
    name: 'The Flour Works',
    category: 'Food & drink',
    city: 'Pune',
    area: 'Kalyani Nagar',
    address: 'Kalyani Nagar, Pune, Maharashtra',
    description:
      'A neighbourhood restaurant for a longer brunch or an easy meal with friends.',
    image: require('../../../assets/images/places/empress-garden.jpg'),
    goodFor: 'Brunch and a relaxed meal',
    bestTime: 'Weekend brunch',
    notes: [
      {
        author: 'A brunch regular',
        note: 'A good option when the plan is to take your time over a meal.',
        occasion: 'A weekend brunch',
      },
    ],
  },
  {
    id: 'marine-drive',
    name: 'Marine Drive',
    category: 'Outdoors',
    city: 'Mumbai',
    area: 'Churchgate',
    address: 'Marine Drive, Mumbai, Maharashtra',
    description:
      'A breezy waterfront promenade that is especially inviting as the city winds down for the evening.',
    image: require('../../../assets/images/places/aga-khan-palace.jpg'),
    goodFor: 'An evening walk and sea views',
    bestTime: 'Sunset',
    notes: [
      {
        author: 'An evening walker',
        note: 'The long curve of the promenade is best enjoyed without a tight schedule.',
        occasion: 'A Mumbai evening',
      },
    ],
  },
  {
    id: 'bandra-fort',
    name: 'Bandra Fort',
    category: 'Culture',
    city: 'Mumbai',
    area: 'Bandra West',
    address: 'Bandra Fort, Bandra West, Mumbai',
    description:
      'A compact heritage stop beside the water, with open views toward the Bandra-Worli Sea Link.',
    image: require('../../../assets/images/places/aga-khan-palace.jpg'),
    goodFor: 'A short walk and coastal views',
    bestTime: 'Late afternoon',
    notes: [
      {
        author: 'A city visitor',
        note: 'Pair it with a walk around the neighbourhood if you have extra time.',
        occasion: 'A Bandra afternoon',
      },
    ],
  },
  {
    id: 'cubbon-park',
    name: 'Cubbon Park',
    category: 'Outdoors',
    city: 'Bengaluru',
    area: 'Central Bengaluru',
    address: 'Kasturba Road, Bengaluru, Karnataka',
    description:
      'A broad, leafy park in the middle of the city, made for a walk, a book or a slower morning.',
    image: require('../../../assets/images/places/okayama-garden.jpg'),
    goodFor: 'A morning walk and green space',
    bestTime: 'Early morning',
    notes: [
      {
        author: 'A park regular',
        note: 'There is plenty of room to find a quieter path away from the main roads.',
        occasion: 'A Bengaluru morning',
      },
    ],
  },
  {
    id: 'lalbagh-botanical-garden',
    name: 'Lalbagh Botanical Garden',
    category: 'Outdoors',
    city: 'Bengaluru',
    area: 'Mavalli',
    address: 'Mavalli, Bengaluru, Karnataka',
    description:
      'A well-loved botanical garden with long paths, mature trees and a chance to take the day slowly.',
    image: require('../../../assets/images/places/okayama-garden.jpg'),
    goodFor: 'Gardens and a long walk',
    bestTime: 'Morning',
    notes: [
      {
        author: 'A garden visitor',
        note: 'Wear comfortable shoes if you plan to explore more than the main paths.',
        occasion: 'A day outside',
      },
    ],
  },
  {
    id: 'third-wave-coffee',
    name: 'Third Wave Coffee',
    category: 'Food & drink',
    city: 'Bengaluru',
    area: 'Indiranagar',
    address: 'Indiranagar, Bengaluru, Karnataka',
    description:
      'A neighbourhood coffee stop for a familiar cup, a light bite and a little time to reset.',
    image: require('../../../assets/images/places/cafe-peter.jpg'),
    goodFor: 'Coffee and a quick break',
    bestTime: 'Mid-morning',
    notes: [
      {
        author: 'A coffee drinker',
        note: 'A relaxed stop to recharge while exploring the area.',
        occasion: 'A mid-morning break',
      },
    ],
  },
];
