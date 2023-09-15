'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';

const Calculator = ({
  collections,
  setQuantity
}: {
  collections: { title: string; handle: string }[];
  setQuantity: (numb: number) => void;
}) => {
  const [collectionType, setCollectionType] = useState('');
  const [measurements, setMeasurements] = useState({ height: '', width: '', unit: 'inches' });

  //we only have to calculate measurments for those collection types
  useEffect(() => {
    const handlesToCheck = ['hexa', 'murals', 'quad'];

    collections.forEach((collection) => {
      if (
        collection.handle === handlesToCheck[0] ||
        collection.handle === handlesToCheck[1] ||
        collection.handle === handlesToCheck[2]
      ) {
        setCollectionType(collection.handle);
      }
    });
  }, [collections]);

  function handleMeasurementChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [id]: value
    }));
  }
  const calculateUnit = () => {
    // Create local variables and assign the values from the state
    let height = parseFloat(measurements.height);
    let width = parseFloat(measurements.width);

    if (isNaN(height) || isNaN(width)) {
      return toast({
        variant: 'destructive',
        title: 'Please enter valid numeric values for height and width'
      });
    }

    // Convert height and width to meters if needed
    switch (measurements.unit) {
      case 'inches':
        height *= 0.0254; // Convert inches to meters
        width *= 0.0254;
        break;
      case 'feet':
        height *= 0.3048; // Convert feet to meters
        width *= 0.3048;
        break;
      case 'centimeters':
        height *= 0.01; // Convert centimeters to meters
        width *= 0.01;
        break;
      // No need to convert if the unit is already in meters
      case 'meters':
      default:
        break;
    }

    let unit = 0; // Initialize the unit variable

    if (collectionType === 'hexa') {
      // Product is a Hexa Roll (1.06mx15.6m = 16.53m2)
      const rollCoverageArea = 16.53; // Roll coverage area in square meters
      unit = (height * width * 1.2) / rollCoverageArea;
    } else if (collectionType === 'quad') {
      // Product is a Quad Roll (1.06mx10m = 10.6m2)
      const rollCoverageArea = 10.6; // Roll coverage area in square meters
      unit = (height * width * 1.2) / rollCoverageArea;
    } else {
      // Product is a Mural (1m X 1m = 1m2)
      const muralCoverageArea = 1; // Mural coverage area in square meters
      unit = ((height + 0.075) * (width + 0.075)) / muralCoverageArea;
    }

    // Round the unit to the nearest integer
    unit = Math.round(unit);

    toast({
      variant: 'default',
      title: 'Success!'
    });

    console.log(unit);
    setQuantity(Math.round(unit) ? Math.round(unit) : 1);
    return unit;
  };

  if (!collectionType) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4 pb-5">
      <div>
        <h3 className=" text-lg font-semibold uppercase tracking-wide"> Measurement Calculator</h3>
        <h3>Enter Your Measurements to get a quantity estimate</h3>
      </div>
      <div className="flex gap-5">
        <div className="w-1/4">
          <Label>Height</Label>
          <Input
            type="text"
            placeholder="Height"
            id="height"
            className="pl-2"
            value={measurements.height}
            onChange={(e) => {
              handleMeasurementChange(e);
            }}
          />
        </div>
        <div className="w-1/4">
          <Label>Width</Label>
          <Input
            type="text"
            placeholder="Width"
            id="width"
            className="pl-2"
            value={measurements.width}
            onChange={(e) => {
              handleMeasurementChange(e);
            }}
          />
        </div>
        <div className="w-2/4">
          <Label>Unit</Label>
          <Select
            defaultValue="inches"
            onValueChange={(val) => {
              setMeasurements({ ...measurements, unit: val });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Unit" className="pl-2" />
            </SelectTrigger>
            <SelectContent className="w-[200px] bg-[#FFF]">
              <SelectItem value="inches">Inches</SelectItem>
              <SelectItem value="feet">Feet</SelectItem>
              <SelectItem value="centimeters">Centimeters</SelectItem>
              <SelectItem value="meters">Meters</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <button
        aria-label="Calculate"
        onClick={() => {
          calculateUnit();
        }}
        className={
          'relative flex w-full items-center justify-center rounded-full bg-green p-2 tracking-wide text-white hover:opacity-90'
        }
      >
        Calculate
      </button>
    </div>
  );
};

export default Calculator;
