// import profile1 from 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
// import profile2 from 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';


function createData(profile, name, position, duties) {
    return { profile, name, position, duties };
}

const rows = [
    createData('https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 1', 'Role', ['', '',]),
    createData('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 2', 'Role',  ['', '',]),
    createData('https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', 'Employee 3', 'Role',  ['', '',]),
    createData('https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 4', 'Role',  ['', '',]),
    createData('https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400', 'Employee 5', 'Role',  ['', '',]),
    createData('https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 6', 'Role',  ['', '',]),
    createData('https://images.pexels.com/photos/2838597/pexels-photo-2838597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 7', 'Role',  ['', '',]),
    createData('https://images.pexels.com/photos/1900452/pexels-photo-1900452.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', 'Employee 8', 'Role',  ['', '',]),
    createData('https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400', 'Employee 9', 'Role',  ['', '',]),
    createData('https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400', 'Employee 10', 'Role',  ['', '',]),
    // createData('https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 1', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 2', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', 'Employee 3', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 4', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400', 'Employee 5', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 6', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/2838597/pexels-photo-2838597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Employee 7', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/1900452/pexels-photo-1900452.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', 'Employee 8', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400', 'Employee 9', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
    // createData('https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400', 'Employee 10', 'Role', ['Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off','Duty', 'Duty','Duty', 'Duty', 'Off']),
];

export default rows;
