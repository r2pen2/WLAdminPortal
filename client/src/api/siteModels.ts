// @ts-ignore
import { FirestoreSerializable, SiteModel } from "../libraries/Web-Legos/api/models.ts";

export class BeforeAndAfter extends SiteModel implements FirestoreSerializable {
  constructor() {
    super("befores-and-afters", "Before And After")
  }
  booleans = {}
  images = {
    beforeSource: "",
    afterSource: "",
  }
  numbers = {
    order: null,
  }
  shortStrings = {}
  longStrings = {
    description: "",
  }
  
  fillConstantExampleData() {
    this.images.beforeSource = "https://ih1.redbubble.net/image.3309736636.6267/st,small,507x507-pad,600x600,f8f8f8.jpg";
    this.images.afterSource = "https://ih1.redbubble.net/image.3309736636.6267/st,small,507x507-pad,600x600,f8f8f8.jpg";
    this.longStrings.description = "Garfield got so big! Look at him!";
    return this;
  }

  static examples = {
    default: (new BeforeAndAfter()).fillConstantExampleData().toFirestore(),
  }

  fromFirestore(data: any) : BeforeAndAfter {
    const b = new BeforeAndAfter();
    b.id = data.id;
    b.images.beforeSource = data.beforeSource;
    b.images.afterSource = data.afterSource;
    b.longStrings.description = data.description;
    b.numbers.order = data.order;
    return b;
  }
}

export class Testimonial extends SiteModel {
  
  constructor(virtual?: boolean) {
    super("testimonials", "Testimonial")
    this.booleans.virtual = !!virtual;
  }
  
  booleans = {
    virtual: false
  }
  images = {}
  numbers = {
    order: null,
  }
  shortStrings = {
    author: "",
  }
  longStrings = {
    message: "",
  }

  fillConstantExampleData() {
    this.longStrings.message = "Like having a visit from a loving mom and your favorite elementary school teacher who is also a great gardener. :) Jess is so instructive and kind, and practical. After two years of deliberating on a garden design, I was able to cut a new bed shape and start planting immediately. My new garden will cost me next to nothing, whereas the last proposal I was given was for $10K!! So happy I did this. 💚";
    this.shortStrings.author = "Diana Roy";
    return this;
  }

  static examples = {
    default: (new Testimonial(false)).fillConstantExampleData().toFirestore(),
    virtual: (new Testimonial(true)).fillConstantExampleData().toFirestore(),
  }

  fromFirestore(data: any) : Testimonial {
    const t = new Testimonial();
    t.id = data.id;
    t.shortStrings.author = data.author;
    t.longStrings.message = data.message;
    t.numbers.order = data.order;
    t.booleans.virtual = data.virtual;
    return t;
  }
}

export class TestimonialSlideshowPicture extends SiteModel {
  constructor() {
    super("testimonial-slideshow-pictures", "Testimonial Slideshow Picture")
  }
  booleans = {}
  images = {
    imageSource: "",
  }
  numbers = {
    order: null,
  }
  shortStrings = {}
  longStrings = {
    caption: "",
  }

  fillConstantExampleData() {
    this.images.imageSource = "https://ih1.redbubble.net/image.3309736636.6267/st,small,507x507-pad,600x600,f8f8f8.jpg";
    this.longStrings.caption = "Garfield got so big! Look at him!";
    return this;
  }

  static examples = {
    default: (new TestimonialSlideshowPicture()).fillConstantExampleData().toFirestore(),
  }

  fromFirestore(data: any) : TestimonialSlideshowPicture {
    const tsp = new TestimonialSlideshowPicture();
    tsp.id = data.id;
    tsp.longStrings.caption = data.caption;
    tsp.numbers.order = data.order;
    tsp.images.imageSource = data.imageSource;
    return tsp;
  }
}

export class TeachingItem extends SiteModel {
  
  constructor() {
    super("teaching-items", "Teaching Item")
  }
  
  booleans = {
  }
  images = {}
  numbers = {
    order: null,
  }
  shortStrings = {
  }
  longStrings = {
    title: "",
    desctiption: "",
  }

  fillConstantExampleData() {
    this.longStrings.title = "The Arlington Community Education Catalog";
    this.longStrings.desctiption = "I usually teach at least one class on gardening for beginners in the spring and fall, so look out for those if you're local!";
    return this;
  }

  static examples = {
    default: (new TeachingItem()).fillConstantExampleData().toFirestore(),
  }

  fromFirestore(data: any) : TeachingItem {
    const ti = new TeachingItem();
    ti.id = data.id;
    ti.longStrings.title = data.title;
    ti.longStrings.desctiption = data.description;
    ti.numbers.order = data.order;
    return ti;
  }
}

export class VirtualServiceItem extends SiteModel {
  
  constructor() {
    super("virtual-service-items", "Virtual Service Item")
  }
  
  booleans = {}
  images = {}
  numbers = {
    order: null,
  }
  shortStrings = {
    text: "",
  }
  longStrings = {}

  fillConstantExampleData() {
    this.shortStrings.text = "Sessions are conveniently conducted over FaceTime or Google Meet.";
    return this;
  }

  static examples = {
    default: (new VirtualServiceItem()).fillConstantExampleData().toFirestore(),
  }

  fromFirestore(data: any) : VirtualServiceItem {
    const vsi = new VirtualServiceItem();
    vsi.id = data.id;
    vsi.shortStrings.text = data.text;
    vsi.numbers.order = data.order;
    return vsi;
  }
}

export class InPersonServiceItem extends SiteModel {
  
  constructor() {
    super("in-person-service-items", "In-Person Service Item")
  }
  
  booleans = {}
  images = {}
  numbers = {
    order: null,
  }
  shortStrings = {
    text: "",
  }
  longStrings = {}

  fillConstantExampleData() {
    this.shortStrings.text = "I will personally guide you on plant care and propose improvements customized to your garden.";
    return this;
  }

  static examples = {
    default: (new InPersonServiceItem()).fillConstantExampleData().toFirestore(),
  }

  fromFirestore(data: any) : InPersonServiceItem {
    const ipsi = new InPersonServiceItem();
    ipsi.id = data.id;
    ipsi.shortStrings.text = data.text;
    ipsi.numbers.order = data.order;
    return ipsi;
  }
}