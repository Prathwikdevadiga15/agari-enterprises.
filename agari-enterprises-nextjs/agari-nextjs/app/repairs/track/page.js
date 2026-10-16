import RepairsPage from '../page';

export const metadata = {
  title: 'Track Repair Status | Agari Enterprises',
  description: 'Track your appliance repair ticket live with your ticket number or phone number.',
};

export default function TrackRepairPage() {
  return <RepairsPage initialTab="track" />;
}
