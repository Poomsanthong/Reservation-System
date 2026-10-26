import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MerchantCard = () => {
  return (
    <Card>
      <CardContent className="flex   gap-4 p-4 sm:flex-row sm:items-start sm:p-6">
        <img
          src="/Logo.jpg"
          alt="Restaurant Image"
          className="w-24 h-24 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="min-w-0">
              <h3 className="text-primary-900 text-base sm:text-lg md:text-xl font-semibold mb-1 truncate">
                The Gourmet Kitchen
              </h3>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-600 truncate">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Downtown Manhattan, NY</span>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-primary-900 text-sm sm:text-base">4.8</span>
            </div>
          </div>

          <p className="mb-4 text-xs sm:text-sm md:text-base leading-5 sm:leading-6 text-primary-600 break-words">
            Contemporary cuisine with seasonal ingredients.
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Fine Dining
            </Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Romantic
            </Badge>
            <Badge variant="secondary" className="text-xs sm:text-sm">
              Live Music
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MerchantCard;
