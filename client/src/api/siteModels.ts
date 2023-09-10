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
    title: "",
    url: ""
  }
  longStrings = {
  }
  
  fillConstantExampleData(alt?: boolean) {
    this.images.logoSource = alt ? "https://www.youcandoitgardening.com/static/media/logoNoText.ea403d4785551ef75409.png" : "https://beyondthebelleducation.com/static/media/logoTransparentBlack.79c1457b6c1da17b2b6a.png";
    this.shortStrings.title = alt ? "You Can Do It Gardening" : "Beyond The Bell Education";
    this.shortStrings.url = alt ? "https://www.youcandoitgardening.com/" : "https://www.beyondthebelleducation.com/";
    return this;
  }

  static examples = {
    default: (new AvailableSite()).fillConstantExampleData().toFirestore(),
    alternate: (new AvailableSite()).fillConstantExampleData(true).toFirestore(),
  }

  fromFirestore(data: any) : AvailableSite {
    const instance = new AvailableSite();
    instance.images.logoSource = data.logoSource;
    instance.shortStrings.title = data.title;
    return instance;
  }
}