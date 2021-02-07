const constants = {
    pickupAddress: 'Pickup Address',
    destinationAddress:'Destination Address',
    noOfUnits:'Number of units',
    weightPerUnit:'Weight Per Unit',
    DimensionPerUnit: 'Dimension Per Unit',
    truckNumber: 'Truck Number',
    driverName: 'Driver Name',
    driverNumber: 'Driver Phone Number',
    estimatedPickup: 'Estimated Pickup',
    estimatedDelivery: 'Estimated Delivery',
    usersName: 'Name',
    usersEmail:'Email',
    usersPhone:'Phone',
    usersDesignation:'Designation',
    usersDepartment:'Department',
    usersRole:'Role',
    usersAccesses:'Accesses',
    usersAddedDate:'AddedDate',
    permitStates:[
      {name:'All India Permit',id:'AI'},
      {name:'Andaman and Nicobar Islands',id:'AN'},
      {name:'Andhra Pradesh',id:'AP'},
      {name:'Arunachal Pradesh',id:'AR'},
      {name:'Assam',id:'AS'},
      {name:'Bihar',id:'BR'},
      {name:'Chandigarh',id:'CH'},
      {name:'Chhattisgarh',id:'CG'},
      {name:'Dadra and Nagar Haveli',id:'DN'},
      {name:'Daman and Diu',id:'DD'},
      {name:'Delhi',id:'DL'},
      {name:'Goa',id:'GA'},
      {name:'Gujarat',id:'GJ'},
      {name:'Haryana',id:'HR'},
      {name:'Himachal Pradesh',id:'HP'},
      {name:'Jammu and Kashmi',id:'JK'},
      {name:'Jharkhand',id:'JH'},
      {name:'Karnataka',id:'KA'},
      {name:'Kerala',id:'KL'},
      {name:'Lakshadweep',id:'LD'},
      {name:'Madhya Pradesh',id:'MP'},
      {name:'Maharashtra',id:'MH'},
      {name:'Manipur',id:'MN'},
      {name:'Meghalaya',id:'ML'},
      {name:'Mizoram',id:'MZ'},
      {name:'Nagaland',id:'NL'},
      {name:'Odisha',id:'OR'},
      {name:'Puducherry',id:'PY'},
      {name:'Punjab',id:'PB'},
      {name:'Rajasthan',id:'RJ'},
      {name:'Sikkim',id:'SK'},
      {name:'Tamil Nadu',id:'TN'},
      {name:'Telangana',id:'TG'},
      {name:'Tripura',id:'TR'},
      {name:'Uttar Pradesh',id:'UP'},
      {name:'Uttarakhand',id:'UT'},
      {name:'West Bengal',id:'WB'}
    ],

    /**Capacity Manager */
    capacityType:[
      {name:'Truck',value:'truck'},
      {name:'Warehouse',value:'warehouse'}
    ],
    capabilityOptions: [
      {name: 'GPS', id: 1,key:'gps',value:'',unit:''},
      {name: 'Freezer', id: 2,key:'freezer',value:'',unit:''},
      {name:'Fastag',id:3,key:'fastag',value:'',unit:''},
      {name:'AC',id:4,key:'ac',value:'',unit:''},
      
    ],
    warehouseCapabilityOptions:[
      {name:'Trained Staff',id:1,key:'trainedStaff',value:'',unit:'kg'},
      {name:'Safety',id:2,key:'safety',value:'',unit:'cm'},
      {name:'Market Proximity',id:3,key:'marketProximity',value:'',unit:'number'},
      {name:'Parking',id:4,key:'parking',value:'',unit:'kg'},
      {name:'Mechanical Appliances',id:5,key:'mechanicalAppliances',value:'',unit:'cm'},
      {name:'Emergency Protocols',id:6,key:'emergencyProtocols',value:'',unit:'inches'},
      {name:'Customer Service',id:7,key:'customerService',value:'',unit:'number'}
    ],
    capacityUnits:[
      {name:'Sqft.',value:'sqft'},
      {name:'Tons',value:'tons'}
    ],
    userManagerRoles:[
      {name:'',value:''},
      {name:'Admin',value:'admin'},
      {name:'Executive',value:'executive'},
      {name:'Finance',value:'finance'}
    ],
    

}

  export default constants