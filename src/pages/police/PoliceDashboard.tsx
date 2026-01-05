import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Car, AlertTriangle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Accident {
  id: number;
  time: string;
  location: string;
  status: "New" | "Unit informed" | "Resolved";
  coordinates: string;
  speed: number;
  address: string;
}

const mockAccidents: Accident[] = [
  {
    id: 1,
    time: "08:41",
    location: "Kimironko",
    status: "New",
    coordinates: "-1.9456, 30.0615",
    speed: 0,
    address: "KG 15 Ave, Kimironko",
  },
  {
    id: 2,
    time: "08:30",
    location: "Nyamirambo",
    status: "Unit informed",
    coordinates: "-1.9789, 30.0412",
    speed: 45,
    address: "KN 3 Rd, Nyamirambo",
  },
];

const PoliceDashboard = () => {
  const navigate = useNavigate();
  const [accidents] = useState<Accident[]>(mockAccidents);

  const activeAccidents = accidents.filter((a) => a.status !== "Resolved").length;
  const respondingUnits = accidents.filter((a) => a.status === "Unit informed").length;

  const getStatusBadge = (status: Accident["status"]) => {
    const variants: Record<Accident["status"], string> = {
      New: "bg-destructive text-destructive-foreground",
      "Unit informed": "bg-yellow-500 text-black",
      Resolved: "bg-success text-success-foreground",
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          🚨 Accident Response System
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-card border-destructive/30">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-full bg-destructive/20">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Active Accidents</p>
              <p className="text-4xl font-bold text-foreground">{activeAccidents}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-primary/30">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 rounded-full bg-primary/20">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Responding Units</p>
              <p className="text-4xl font-bold text-foreground">{respondingUnits}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Map Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🗺️ LIVE MAP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
            <p className="text-muted-foreground z-10">Map View Placeholder</p>
            {/* Mock markers */}
            <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-destructive rounded-full animate-pulse" />
            <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-destructive rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-primary rounded-full" />
          </div>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-destructive" />
              <span className="text-muted-foreground">Accident Marker (Red)</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Police Unit Marker (Blue)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accident List */}
      <Card>
        <CardHeader>
          <CardTitle>Accident List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accidents.map((accident) => (
                <TableRow
                  key={accident.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => navigate(`/police/accident/${accident.id}`)}
                >
                  <TableCell className="font-medium">{accident.id}</TableCell>
                  <TableCell>{accident.time}</TableCell>
                  <TableCell>{accident.location}</TableCell>
                  <TableCell>{getStatusBadge(accident.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoliceDashboard;
