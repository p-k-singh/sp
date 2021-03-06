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

  CapacityType: [
    { label: "Truck", value: "truck" },
    { label: "Warehouse", value: "warehouse" },
  ],
  CapacityTypeMap: {
    truck:{ label: "Truck", value: "truck" },
    warehouse:{ label: "Warehouse", value: "warehouse" },
},
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
  truckCapacityOptions: [
    { label: "1 Ton", value: "1" },
    { label: "2 Ton", value: "2" },
    { label: "3 Ton", value: "3" },
    { label: "4 Ton", value: "4" },
    { label: "5 Ton", value: "5" },
    { label: "6 Ton", value: "6" },
    { label: "7 Ton", value: "7" },
    { label: "8 Ton", value: "8" },
    { label: "9 Ton", value: "9" },
    { label: "10 Ton", value: "10" },
    { label: "11 Ton", value: "11" },
    { label: "12 Ton", value: "12" },
    { label: "13 Ton", value: "13" },
    { label: "14 Ton", value: "14" },
    { label: "15 Ton", value: "15" },
    { label: "16 Ton", value: "16" },
    { label: "17 Ton", value: "17" },
    { label: "18 Ton", value: "18" },
    { label: "19 Ton", value: "19" },
    { label: "20 Ton", value: "20" },
    { label: "21 Ton", value: "21" },
    { label: "22 Ton", value: "22" },
    { label: "23 Ton", value: "23" },
    { label: "24 Ton", value: "24" },
    { label: "25 Ton", value: "25" },
    { label: "26 Ton", value: "26" },
    { label: "27 Ton", value: "27" },
    { label: "28 Ton", value: "28" },
    { label: "29 Ton", value: "29" },
    { label: "30 Ton", value: "30" },
    { label: "31 Ton", value: "31" },
    { label: "32 Ton", value: "32" },
  ],

  truckCapabilityOptions: [
    { label: "Canter", value: "canter", data: "", unit: "" },
    { label: "Car Carrier", value: "carCarriers", data: "", unit: "" },
    {
      label: "Containers Close Body",
      value: "containersCloseBody",
      data: "",
      unit: "",
    },
    { label: "Truck", value: "truck", data: "", unit: "" },
    { label: "LCV", value: "lcv", data: "", unit: "" },
    {
      label: "Flat Bed Trailers",
      value: "flatBedTrailer",
      data: "",
      unit: "",
    },
    {
      label: "Multi Axle Trailers",
      value: "multiAxleTrailers",
      data: "",
      unit: "",
    },
    {
      label: "Container Trucks",
      value: "ContainerTrucks",
      data: "",
      unit: "",
    },
    { label: "Refrigerated/AC", value: "refrigerated/ac", data: "", unit: "" },
    {
      label: "Hydraulic Trucks",
      value: "hydraulicTrucks",
      data: "",
      unit: "",
    },
    {
      label: "Over Dimension Cargo Truck",
      value: "overDimensionCargoTruck",
      data: "",
      unit: "",
    },
    {
      label: "Semi Low Bed Trailer",
      value: "semiLowBedTrailer",
      data: "",
      unit: "",
    },
    { label: "Low Bed Trailer", value: "lowBedTrailers", data: "", unit: "" },
    { label: "Tanker Truck", value: "tankerTruck", data: "", unit: "" },
  ],
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
  DeliveryCommitmentOptions: [
    { label: "1 Day", value: 1 },
    { label: "2 Days", value: 2 },

    { label: "3 Days", value: 3 },

    { label: "4 Days", value: 4 },

    { label: "5 Days", value: 5 },
    { label: "6 Days", value: 6 },

    { label: "7 Days", value: 7 },
  ],

  DistanceOptions: [
    {
      label: "0 - 50 Kms",
      value: {
        lowRange: 0,
        highRange: 50,
      },
    },
    {
      label: "50 - 200 Kms",
      value: {
        lowRange: 50,
        highRange: 200,
      },
    },
    {
      label: "200 - 400 Kms",
      value: {
        lowRange: 200,
        highRange: 400,
      },
    },
    {
      label: "400 - 800 Kms",
      value: {
        lowRange: 400,
        highRange: 800,
      },
    },
    {
      label: "800+ Kms",
      value: {
        lowRange: 800,
        highRange: 2000,
      },
    },
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

  truckCapabilityMap: {
    canter: { label: "Canter", value: "canter" },
    carCarriers: { label: "Car Carrier", value: "carCarriers" },
    containersCloseBody: {
      label: "Containers Close Body",
      value: "containersCloseBody",
    },
    truck: { label: "Truck", value: "truck" },
    lcv: { label: "LCV", value: "lcv" },
    flatBedTrailer: {
      label: "Flat Bed Trailers",
      value: "flatBedTrailer",
    },
    multiAxleTrailers: {
      label: "Multi Axle Trailers",
      value: "multiAxleTrailers",
    },
    ContainerTrucks: {
      label: "Container Trucks",
      value: "ContainerTrucks",
    },
    refrigeratedOrAc: { label: "Refrigerated/AC", value: "refrigeratedOrAc" },
    hydraulicTrucks: {
      label: "Hydraulic Trucks",
      value: "hydraulicTrucks",
    },
    overDimensionCargoTruck: {
      label: "Over Dimension Cargo Truck",
      value: "overDimensionCargoTruck",
    },
    semiLowBedTrailer: {
      label: "Semi Low Bed Trailer",
      value: "semiLowBedTrailer",
    },
    lowBedTrailers: { label: "Low Bed Trailer", value: "lowBedTrailers" },
    tankerTruck: { label: "Tanker Truck", value: "tankerTruck" },
  },
  truckCapacityMap: {
    1: { label: "1 Ton", value: "1" },
    2: { label: "2 Ton", value: "2" },
    3: { label: "3 Ton", value: "3" },
    4: { label: "4 Ton", value: "4" },
    5: { label: "5 Ton", value: "5" },
    6: { label: "6 Ton", value: "6" },
    7: { label: "7 Ton", value: "7" },
    8: { label: "8 Ton", value: "8" },
    9: { label: "9 Ton", value: "9" },
    10: { label: "10 Ton", value: "10" },
    11: { label: "11 Ton", value: "11" },
    12: { label: "12 Ton", value: "12" },
    13: { label: "13 Ton", value: "13" },
    14: { label: "14 Ton", value: "14" },
    15: { label: "15 Ton", value: "15" },
    16: { label: "16 Ton", value: "16" },
    17: { label: "17 Ton", value: "17" },
    18: { label: "18 Ton", value: "18" },
    19: { label: "19 Ton", value: "19" },
    20: { label: "20 Ton", value: "20" },
    21: { label: "21 Ton", value: "21" },
    22: { label: "22 Ton", value: "22" },
    23: { label: "23 Ton", value: "23" },
    24: { label: "24 Ton", value: "24" },
    25: { label: "25 Ton", value: "25" },
    26: { label: "26 Ton", value: "26" },
    27: { label: "27 Ton", value: "27" },
    28: { label: "28 Ton", value: "28" },
    29: { label: "29 Ton", value: "29" },
    30: { label: "30 Ton", value: "30" },
    31: { label: "31 Ton", value: "31" },
    32: { label: "32 Ton", value: "32" },
  },
};

export default constants;
