import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const MerchantCard = () => {
  return (
    <div>
      {" "}
      <Card>
        <CardContent className="p-6 flex gap-4">
          <div className="w-24 h-24 bg-linear-to-br from-orange-400 to-pink-500 rounded-lg" />
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-primary-900 mb-1">The Gourmet Kitchen</h3>
                <div className="flex items-center gap-2 text-sm text-primary-600">
                  <MapPin className="w-4 h-4" />
                  Downtown Manhattan, NY
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-primary-900">4.8</span>
              </div>
            </div>

            <p className="text-sm text-primary-600 mb-3">
              Contemporary cuisine with seasonal ingredients.
            </p>

            <div className="flex gap-2">
              <Badge variant="secondary">Fine Dining</Badge>
              <Badge variant="secondary">Romantic</Badge>
              <Badge variant="secondary">Live Music</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantCard;
