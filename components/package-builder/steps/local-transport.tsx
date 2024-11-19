import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface IProps {
  includeAirportTransfer: boolean;
  setIncludeAirportTransfer: (include: boolean) => void;
  includeClinicTransfer: boolean;
  setIncludeClinicTransfer: (include: boolean) => void;
  handleNext: () => void;
}

export function LocalTransportSection({
  includeAirportTransfer,
  setIncludeAirportTransfer,
  includeClinicTransfer,
  setIncludeClinicTransfer,
  handleNext
}: IProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Local Transport Options</h3>
        <Button variant="outline" onClick={() => {
          setIncludeAirportTransfer(false)
          setIncludeClinicTransfer(false)
          handleNext()
        }}>
          Skip Local Transport
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="airportTransfer"
            checked={includeAirportTransfer}
            onCheckedChange={(checked) => setIncludeAirportTransfer(checked as boolean)}
          />
          <Label htmlFor="airportTransfer">Airport Transfer (Round Trip)</Label>
        </div>
        <div className="pl-6 space-y-2">
          <p className="text-sm text-muted-foreground">Includes pickup from airport to hotel and return</p>
          <p className="font-medium">Price: $100</p>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="clinicTransfer"
            checked={includeClinicTransfer}
            onCheckedChange={(checked) => setIncludeClinicTransfer(checked as boolean)}
          />
          <Label htmlFor="clinicTransfer">Clinic Transfer (Round Trip)</Label>
        </div>
        <div className="pl-6 space-y-2">
          <p className="text-sm text-muted-foreground">Includes pickup from hotel to clinic and return</p>
          <p className="font-medium">Price: $50</p>
        </div>
      </div>
    </div>
  )
}