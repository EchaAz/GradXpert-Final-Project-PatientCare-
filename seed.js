const Doctor = require('./models/doctors');
const sequelize = require('./seq');

const doctorsData = [
  {
    name: 'Dr. Aomori Mine',
    speciality: 'Cardiology',
    practiceAddress: '404 Johannes St, Trinity',
    phone: '0911-1444-4200',
    email: 'aomori.mine@knight.com',
    schedule: 'Monday - Saturday: 9am - 6pm'
  },
  {
    name: 'Dr. Sumi Serina',
    speciality: 'Pediatrics',
    practiceAddress: '404 Johannes St, Trinity',
    phone: '1222-2345-8888',
    email: 'sumi.serina@knight.com',
    schedule: 'Monday - Wednesday: 10am - 6pm, Saturday - Sunday: 12am - 6pm'
  },
  {
    name: 'Dr. Asagao Hanae',
    speciality: 'Radiology',
    practiceAddress: '456 Elm St, Town',
    phone: '1244-7777-2020',
    email: 'asagao.hanae@knight.com',
    schedule: 'Monday - Friday: 8am - 6pm'
  },{
    name: 'Dr. Himuro Sena',
    speciality: 'Orthopedics',
    practiceAddress: '999 Baal St, Gehenna',
    phone: '0911-1444-4600',
    email: 'himuro.sena@emer.com',
    schedule: 'Monday - Wednesday: 9am - 5pm, Friday: 10am - 6pm'
},
{
    name: 'Dr. Black Jack',
    speciality: 'Surgery',
    practiceAddress: '123 Tezuka St, Tokyo',
    phone: '1222-2345-9100',
    email: 'black.jack@tezuka.com',
    schedule: 'Monday - Saturday: 11am - 7pm'
},
{
    'name': 'Dr. Temperance Brennan',
    'speciality': 'Forensic Anthropology',
    'practiceAddress': '206 Jeffersonian St, Washington D.C.',
    'phone': '1244-7777-2300',
    'email': 'temperance.brennan@bones.com',
    'schedule': 'Monday - Friday: 8am - 4pm'
},
{
  name: 'Dr. Gregory House',
  speciality: 'Nephrology',
  practiceAddress: '123 Princeton St, Plainsboro',
  phone: '0911-1444-4300',
  email: 'gregory.house@fox.com',
  schedule: 'Monday - Friday: 9am - 5pm'
},
{
  name: 'Dr. Derek Shepherd',
  speciality: 'Neurosurgery',
  practiceAddress: '456 Grey Sloan St, Seattle',
  phone: '1222-2345-8900',
  email: 'derek.shepherd@grey.com',
  schedule: 'Monday - Saturday: 10am - 7pm'
},
{
    name: 'Dr. Meredith Grey',
    speciality: 'General Surgery',
    practiceAddress: '456 Grey Sloan St, Seattle',
    phone: '1244-7777-2400',
    email: 'meredith.grey@atomy.com',
    schedule: 'Monday - Friday: 8am - 6pm'
},
{
    name: 'Dr. Stephen Strange',
    speciality: 'Neurosurgery',
    practiceAddress: '177A Bleecker St, New York',
    phone: '0911-1444-4800',
    email: 'stephen.strange@marvel.com',
    schedule: 'Monday - Saturday: 9am - 6pm, Sunday: 10am - 4pm'
}
];

async function seedDoctorData() {
  try {

    await Doctor.sync();
    
    
    await Doctor.bulkCreate(doctorsData);

    console.log('Doctor data seeded successfully');
  } catch (error) {
    console.error('Error seeding doctor data:', error);
  } finally {
    
    await sequelize.close();
  }
}

seedDoctorData();
