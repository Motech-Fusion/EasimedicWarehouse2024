import { Component } from "@angular/core";

@Component({
  selector: "app-price-list-item",
  templateUrl: "./price-list-item.component.html",
  styleUrls: ["./price-list-item.component.scss"],
})
export class PriceListItemComponent {
  planType: string = "";
  price: string = "";
  priceList = [
    {
      planType: "Standard",
      price: "120",
      color: "#c9bb33",
      term: "month",
      benefits: [
        {
          index: 0,
          description:
            "The perfect plan for trying out and getting started with easiMedic",
        },
        {
          index: 1,
          description: "Upload blog posts,comment and like other medics posts",
        },
      ],
    },
    {
      planType: "Pro",
      color: "#33c96d",
      price: "520",
      term: "month",
      benefits: [
        {
          index: 0,
          description:
            "The right plan for getting more out of easimedicwarehouse",
        },
        {
          index: 1,
          description:
            "Engage with patients,recieve notifications and upload posts",
        },
      ],
    },
  ];
}
