// @ts-ignore
import { FirestoreSerializable, SiteModel } from "../libraries/Web-Legos/api/models.ts";

export class AvailableSite extends SiteModel implements FirestoreSerializable {
  constructor() {
    super("available-sites", "AvailableSite")
  }
  booleans = {
  }
  images = {
    logoSource: "",
  }
  numbers = {
  }
  shortStrings = {
    title: ""
  }
  longStrings = {
  }
  
  fillConstantExampleData() {
    this.images.logoSource = "https://beyondthebelleducation.com/static/media/logoTransparentBlack.79c1457b6c1da17b2b6a.png";
    this.shortStrings.title = "Beyond The Bell Education";
    return this;
  }

  static examples = {
    default: (new ExampleModel()).fillConstantExampleData().toFirestore(),
  }

  fromFirestore(data: any) : ExampleModel {
    const e = new ExampleModel();
    e.id = data.id;
    e.booleans.booleanExample = data.booleanExample;
    e.images.imageExample = data.imageExample;
    e.shortStrings.shortStringExample = data.shortStringExample;
    e.longStrings.longStringExample = data.longStringExample;
    e.numbers.order = data.order;
    return e;
  }
}