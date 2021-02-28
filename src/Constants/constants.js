const constants = {
  pickupAddress: "Pickup Address",
  destinationAddress: "Destination Address",
  noOfUnits: "Number of units",
  weightPerUnit: "Weight Per Unit",
  DimensionPerUnit: "Dimension Per Unit",
  truckNumber: "Truck Number",
  driverName: "Driver Name",
  driverNumber: "Driver Phone Number",
  estimatedPickup: "Estimated Pickup",
  estimatedDelivery: "Estimated Delivery",
  usersName: "Name",
  usersEmail: "Email",
  usersPhone: "Phone",
  usersDesignation: "Designation",
  usersDepartment: "Department",
  usersRole: "Role",
  usersAccesses: "Accesses",
  usersAddedDate: "AddedDate",
  permitStates: [
    { name: "All India Permit", id: "AI" },
    { name: "Andaman and Nicobar Islands", id: "AN" },
    { name: "Andhra Pradesh", id: "AP" },
    { name: "Arunachal Pradesh", id: "AR" },
    { name: "Assam", id: "AS" },
    { name: "Bihar", id: "BR" },
    { name: "Chandigarh", id: "CH" },
    { name: "Chhattisgarh", id: "CG" },
    { name: "Dadra and Nagar Haveli", id: "DN" },
    { name: "Daman and Diu", id: "DD" },
    { name: "Delhi", id: "DL" },
    { name: "Goa", id: "GA" },
    { name: "Gujarat", id: "GJ" },
    { name: "Haryana", id: "HR" },
    { name: "Himachal Pradesh", id: "HP" },
    { name: "Jammu and Kashmi", id: "JK" },
    { name: "Jharkhand", id: "JH" },
    { name: "Karnataka", id: "KA" },
    { name: "Kerala", id: "KL" },
    { name: "Lakshadweep", id: "LD" },
    { name: "Madhya Pradesh", id: "MP" },
    { name: "Maharashtra", id: "MH" },
    { name: "Manipur", id: "MN" },
    { name: "Meghalaya", id: "ML" },
    { name: "Mizoram", id: "MZ" },
    { name: "Nagaland", id: "NL" },
    { name: "Odisha", id: "OR" },
    { name: "Puducherry", id: "PY" },
    { name: "Punjab", id: "PB" },
    { name: "Rajasthan", id: "RJ" },
    { name: "Sikkim", id: "SK" },
    { name: "Tamil Nadu", id: "TN" },
    { name: "Telangana", id: "TG" },
    { name: "Tripura", id: "TR" },
    { name: "Uttar Pradesh", id: "UP" },
    { name: "Uttarakhand", id: "UT" },
    { name: "West Bengal", id: "WB" },
  ],

  PermitStates: [
    { label: "All India Permit", value: "AI" },
    { label: "Andaman and Nicobar Islands", value: "AN" },
    { label: "Andhra Pradesh", value: "AP" },
    { label: "Arunachal Pradesh", value: "AR" },
    { label: "Assam", value: "AS" },
    { label: "Bihar", value: "BR" },
    { label: "Chandigarh", value: "CH" },
    { label: "Chhattisgarh", value: "CG" },
    { label: "Dadra and Nagar Haveli", value: "DN" },
    { label: "Daman and Diu", value: "DD" },
    { label: "Delhi", value: "DL" },
    { label: "Goa", value: "GA" },
    { label: "Gujarat", value: "GJ" },
    { label: "Haryana", value: "HR" },
    { label: "Himachal Pradesh", value: "HP" },
    { label: "Jammu and Kashmi", value: "JK" },
    { label: "Jharkhand", value: "JH" },
    { label: "Karnataka", value: "KA" },
    { label: "Kerala", value: "KL" },
    { label: "Lakshadweep", value: "LD" },
    { label: "Madhya Pradesh", value: "MP" },
    { label: "Maharashtra", value: "MH" },
    { label: "Manipur", value: "MN" },
    { label: "Meghalaya", value: "ML" },
    { label: "Mizoram", value: "MZ" },
    { label: "Nagaland", value: "NL" },
    { label: "Odisha", value: "OR" },
    { label: "Puducherry", value: "PY" },
    { label: "Punjab", value: "PB" },
    { label: "Rajasthan", value: "RJ" },
    { label: "Sikkim", value: "SK" },
    { label: "Tamil Nadu", value: "TN" },
    { label: "Telangana", value: "TG" },
    { label: "Tripura", value: "TR" },
    { label: "Uttar Pradesh", value: "UP" },
    { label: "Uttarakhand", value: "UT" },
    { label: "West Bengal", value: "WB" },
  ],

  /**Capacity Manager OLD */
  capacityType: [
    { name: "Truck", value: "truck" },
    { name: "Warehouse", value: "warehouse" },
  ],
  /** Capacity Manager NEW */
  CapacityType: [
    { label: "Truck", value: "truck" },
    { label: "Warehouse", value: "warehouse" },
  ],
  capabilityOptions: [
    { name: "GPS", id: 1, key: "gps", value: "", unit: "" },
    { name: "Freezer", id: 2, key: "freezer", value: "", unit: "" },
    { name: "Fastag", id: 3, key: "fastag", value: "", unit: "" },
    { name: "AC", id: 4, key: "ac", value: "", unit: "" },
  ],
  truckFeatures: [
    { label: "GPS", value: "gps", data: "", unit: "" },
    { label: "Fastag", value: "Fastag", data: "", unit: "" },
  ],

  truckCapabilityOptions: [
    { label: "Canters", value: "Canters", data: "", unit: "" },
    { label: "Car Carriers", value: "CarCarriers", data: "", unit: "" },
    {
      label: "Containers Close Body",
      value: "ContainersCloseBody",
      data: "",
      unit: "",
    },
    { label: "Truck", value: "Truck", data: "", unit: "" },
    { label: "LCV", value: "LCV", data: "", unit: "" },
    {
      label: "Flat Bed Trailers",
      value: "FlatBedTrailers",
      data: "",
      unit: "",
    },
    {
      label: "Multi Axle Trailers",
      value: "MultiAxleTrailers",
      data: "",
      unit: "",
    },
    {
      label: "Container Trucks",
      value: "ContainerTrucks",
      data: "",
      unit: "",
    },
    { label: "Refrigerated/AC", value: "RefrigeratedAC", data: "", unit: "" },
    {
      label: "Hydraulic Trucks",
      value: "HydraulicTrucks",
      data: "",
      unit: "",
    },
    {
      label: "Over Dimension Cargo Truck",
      value: "OverDimensionCargoTruck",
      data: "",
      unit: "",
    },
    {
      label: "Semi Low Bed Trailer",
      value: "SemiLowBedTrailer",
      data: "",
      unit: "",
    },
    { label: "Low Bed Trailer", value: "LowBedTrailer", data: "", unit: "" },
  ],
  /**warehouse capability OLD */
  warehouseCapabilityOptions: [
    {
      name: "Trained Staff",
      id: 1,
      key: "trainedStaff",
      value: "",
      unit: "kg",
    },
    { name: "Safety", id: 2, key: "safety", value: "", unit: "cm" },
    {
      name: "Market Proximity",
      id: 3,
      key: "marketProximity",
      value: "",
      unit: "number",
    },
    { name: "Parking", id: 4, key: "parking", value: "", unit: "kg" },
    {
      name: "Mechanical Appliances",
      id: 5,
      key: "mechanicalAppliances",
      value: "",
      unit: "cm",
    },
    {
      name: "Emergency Protocols",
      id: 6,
      key: "emergencyProtocols",
      value: "",
      unit: "inches",
    },
    {
      name: "Customer Service",
      id: 7,
      key: "customerService",
      value: "",
      unit: "number",
    },
  ],
  /**warehouse capability NEW */
  WarehouseCapabilityOptions: [
    { label: "Trained Staff", value: "trainedStaff", data: "", unit: "" },
    { label: "Safety", value: "safety", data: "", unit: "" },
    { label: "Market Proximity", value: "marketProximity", data: "", unit: "" },
    { label: "Parking", value: "parking", data: "", unit: "" },
    {
      label: "Mechanical Appliances",
      value: "mechanicalAppliances",
      data: "",
      unit: "",
    },
    {
      label: "Emergency Protocols",
      value: "emergencyProtocols",
      data: "",
      unit: "",
    },
    { label: "Customer Service", value: "customerService", data: "", unit: "" },
  ],
  CapacityOptions: [
    { label: "0 - 2 Tons", value: "0to2" },
    { label: "2 - 4 Tons", value: "2to4" },
    { label: "4 - 8 Tons", value: "4to8" },
    { label: "8 - 14 Tons", value: "8to14" },
    { label: "14 - 20 Tons", value: "14to20" },
    { label: "20 - 26 Tons", value: "20to26" },
    { label: "26+ Tons", value: "Above26" },
  ],
  RangeOptions: [
    { label: "0 - 200 Kms", value: "0to200" },
    { label: "200 - 400 Kms", value: "200to400" },
    { label: "400 - 800 Kms", value: "400to800" },
    { label: "800+ Kms", value: "Above800" },
  ],
  capacityUnits: [
    { name: "Sqft.", value: "sqft" },
    { name: "Tons", value: "tons" },
  ],
  lengthDimensions: [
    { label: "Sqft", value: "sqft" },
    { label: "Tons", value: "tons" },
  ],
  userManagerRoles: [
    { name: "", value: "" },
    { name: "Admin", value: "admin" },
    { name: "Executive", value: "executive" },
    { name: "Finance", value: "finance" },
  ],
  ownerShip: [
    { label: "Self", value: "self" },
    { label: "Outsourced", value: "outsourced" },
  ],
  orders: [
    { name: "Upcoming Pickup", value: "Onloading", id: 1 },
    { name: "In Transit", value: "offloading", id: 2 },
    { name: "Accepted", value: "Warehouse", id: 3 },
  ],
};

export default constants;
