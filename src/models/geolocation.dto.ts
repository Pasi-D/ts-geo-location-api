import { ValidateNested, IsLatitude, IsLongitude, IsString } from "class-validator";

class Marker {
  @IsLatitude()
  public lat: string | number;

  @IsLongitude()
  public long: string | number;
}

export class GeoCodeDTO {
  @ValidateNested()
  public start: Marker;

  @ValidateNested()
  public end: Marker;

  @IsString()
  public units: "metric" | "imperial";
}
