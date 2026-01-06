import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Gauge, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AccidentData {
  id: number;
  time: string;
  location: string;
  address: string;
  coordinates: string;
  speed: number;
  status: "New" | "Unit informed" | "Resolved";
}

const mockAccidentData: Record<number, AccidentData> = {
  1: {
    id: 1,
    time: "08:41",
    location: "Kimironko",
    address: "KG 15 Ave, Kimironko",
    coordinates: "-1.9456, 30.0615",
    speed: 0,
    status: "New",
  },
  2: {
    id: 2,
    time: "08:30",
    location: "Nyamirambo",
    address: "KN 3 Rd, Nyamirambo",
    coordinates: "-1.9789, 30.0412",
    speed: 45,
    status: "Unit informed",
  },
};

const AccidentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const accidentId = parseInt(id || "1");
  
  const [accident, setAccident] = useState<AccidentData>(
    mockAccidentData[accidentId] || mockAccidentData[1]
  );

  const handleUnitInformed = () => {
    setAccident((prev) => ({ ...prev, status: "Unit informed" }));
    toast({
      title: "Status Updated",
      description: "Status updated to Unit informed.",
    });
  };

  const getStatusBadge = (status: AccidentData["status"]) => {
    const variants: Record<AccidentData["status"], string> = {
      New: "bg-destructive text-destructive-foreground",
      "Unit informed": "bg-yellow-500 text-black",
      Resolved: "bg-success text-success-foreground",
    };
    return <Badge className={`text-lg px-4 py-1 ${variants[status]}`}>{status.toUpperCase()}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/police")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <Card className="mb-6 border-destructive/30">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-2xl flex items-center gap-3">
            🚨 Accident Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Details Grid */}
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p className="text-lg font-semibold text-foreground">{accident.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-lg font-semibold text-foreground">{accident.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <MapPin className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Coordinates</p>
                <p className="text-lg font-semibold text-foreground font-mono">{accident.coordinates}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <Gauge className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Speed at crash</p>
                <p className="text-lg font-semibold text-foreground">{accident.speed} km/h</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="mt-1">{getStatusBadge(accident.status)}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => navigate(`/police/accident/${accidentId}/dispatch`)}
              disabled={accident.status === "Resolved"}
            >
              Dispatch Unit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-500/10"
              onClick={handleUnitInformed}
              disabled={accident.status === "Resolved" || accident.status === "Unit informed"}
            >
              Unit Informed
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccidentDetails;
