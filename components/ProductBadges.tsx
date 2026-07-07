import { Badge } from '@/components/ui/badge';

export type ProductBadgeType = 
  | '5-FREE'
  | 'Plant-Based'
  | 'Robot Friendly'
  | 'pH Neutral'
  | 'Anti-Bac 99.9%';

interface ProductBadgesProps {
  badges: string[];
  className?: string;
}

export function ProductBadges({ badges, className }: ProductBadgesProps) {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {badges.map((badgeText) => (
        <Badge key={badgeText} variant="secondary">
          {badgeText}
        </Badge>
      ))}
    </div>
  );
}
