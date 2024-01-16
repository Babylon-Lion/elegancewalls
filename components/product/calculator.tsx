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
import { Product } from 'lib/shopify/types';
import { useEffect, useState } from 'react';

const Calculator = ({
  collections,
  setQuantity,
  product
}: {
  collections: { title: string; handle: string }[];
  setQuantity: (num: number) => void;
  product: Product;
}) => {
  const [collectionType, setCollectionType] = useState('');
  const [measurements, setMeasurements] = useState({ height: '', width: '', unit: 'inches' });
  const [suggestedQuantity, setSuggestedQuantity] = useState(0);

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
    let height = parseFloat(measurements.height);
    let width = parseFloat(measurements.width);
    const unit = measurements.unit;
    let area = 0;

    if (isNaN(height) || isNaN(width)) {
      return toast({
        variant: 'destructive',
        title: 'Please enter valid numeric values for height and width'
      });
    }

    if (collectionType === 'murals') {
      switch (unit) {
        case 'meters':
          area = Math.ceil(((width + 0.0762) / 10.7) * ((height + 0.0762) / 10.7));
          break;
        case 'centimeters':
          area = Math.ceil(((width + 7.62) / 30.48) * ((height + 7.62) / 30.48));
          break;
        case 'feet':
          area = Math.ceil((width + 0.25) * (height + 0.25));
          break;
        case 'inches':
          area = Math.ceil(((width + 3) / 12) * ((height + 3) / 12));
          break;
        default:
          break;
      }
    } else {
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
      if (collectionType === 'hexa') {
        // Product is a Hexa Roll (1.06mx15.6m = 16.53m2)
        const rollCoverageArea = 16.53; // Roll coverage area in square meters
        area = Math.ceil((height * width * 1.44) / rollCoverageArea);
      } else if (collectionType === 'quad') {
        // Product is a Quad Roll (1.06mx10m = 10.6m2)

        const rollCoverageArea = 10.6; // Roll coverage area in square meters
        area = Math.ceil((height * width * 1.44) / rollCoverageArea);
      }
      toast({
        variant: 'default',
        title: 'Success!'
      });
    }
    setQuantity(
      area
        ? product.priceRange.maxVariantPrice.amount === '35.16'
          ? 6 * area
          : product.priceRange.maxVariantPrice.amount === '44.75'
          ? 4 * area
          : area
        : 1
    );

    setSuggestedQuantity(
      area
        ? product.priceRange.maxVariantPrice.amount === '35.16'
          ? 6 * area
          : product.priceRange.maxVariantPrice.amount === '44.75'
          ? 4 * area
          : area
        : 1
    );
    return;
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
      <div>
        {suggestedQuantity ? (
          <div className="flex justify-center text-lg font-semibold">
            Suggested Quantity: {suggestedQuantity}
          </div>
        ) : null}
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
