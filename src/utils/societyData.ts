export interface Society {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  borderColor: string;
  link: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}

export const societies: Society[] = [
  {
    id: 'ps',
    name: 'Programming Society',
    description: 'Where passionate coders unite to learn, compete, and build amazing projects together',
    logo: '/uos_footer_logo.jpg',
    color: 'from-green-400 to-blue-600',
    borderColor: 'hover:border-green-500/50',
    link: '/societies/ps',
    accentColor: 'green',
    gradientFrom: 'from-green-400',
    gradientTo: 'to-blue-600'
  },
  {
    id: 'cms',
    name: 'Computing Media Society',
    description: 'Exploring the intersection of technology and media through creative projects.',
    logo: '/uos_footer_logo.jpg',
    color: 'from-cyan-400 to-teal-600',
    borderColor: 'hover:border-cyan-500/50',
    link: '/societies/cms',
    accentColor: 'cyan',
    gradientFrom: 'from-cyan-400',
    gradientTo: 'to-teal-600'
  },
  {
    id: 'ems',
    name: 'Event Management Society',
    description: 'Crafting unforgettable experiences with precision and flair.',
    logo: '/uos_footer_logo.jpg',
    color: 'from-red-400 to-orange-600',
    borderColor: 'hover:border-red-500/50',
    link: '/societies/ems',
    accentColor: 'red',
    gradientFrom: 'from-red-400',
    gradientTo: 'to-orange-600'
  },
  {
    id: 'egaming',
    name: 'E-Gaming Society',
    description: 'Uniting gamers through competition, strategy, and fun.',
    logo: '/uos_footer_logo.jpg',
    color: 'from-blue-400 to-purple-600',
    borderColor: 'hover:border-blue-500/50',
    link: '/societies/egaming',
    accentColor: 'blue',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-purple-600'
  },
  {
    id: 'sports',
    name: 'Sports Society',
    description: 'Promoting teamwork, fitness, and the spirit of competition.',
    logo: '/uos_footer_logo.jpg',
    color: 'from-orange-400 to-yellow-600',
    borderColor: 'hover:border-orange-500/50',
    link: '/societies/sports',
    accentColor: 'orange',
    gradientFrom: 'from-orange-400',
    gradientTo: 'to-yellow-600'
  },
  {
    id: 'pas',
    name: 'Performing Arts Society',
    description: 'Showcasing talent through drama, music, and expression.',
    logo: '/uos_footer_logo.jpg',
    color: 'from-purple-400 to-pink-600',
    borderColor: 'hover:border-purple-500/50',
    link: '/societies/pas',
    accentColor: 'purple',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-pink-600'
  },
  {
    id: 'blood-donation',
    name: 'Blood Donation & Welfare Society',
    description: 'Saving lives and serving humanity with compassion.',
    logo: '/uos_footer_logo.jpg',
    color: 'from-red-400 to-pink-600',
    borderColor: 'hover:border-red-500/50',
    link: '/societies/blood-donation',
    accentColor: 'red',
    gradientFrom: 'from-red-400',
    gradientTo: 'to-pink-600'
  }
];

export function getSocietyById(id: string): Society | undefined {
  return societies.find(society => society.id === id);
}

export function getSocietyByLink(link: string): Society | undefined {
  return societies.find(society => society.link === link);
}
