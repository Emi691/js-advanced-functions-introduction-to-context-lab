// Your code here
function createEmployeeRecord(employeeArray){
    const employeeRecord = {}
    employeeRecord.firstName = employeeArray[0]
    employeeRecord.familyName = employeeArray[1]
    employeeRecord.title = employeeArray[2]
    employeeRecord.payPerHour = employeeArray[3]
    employeeRecord.timeInEvents = []
    employeeRecord.timeOutEvents = []   
    return employeeRecord   
}

function createEmployeeRecords(employeesArray){
    const employeeRecords = employeesArray.map(employee => createEmployeeRecord(employee))
    return employeeRecords
}

function createTimeInEvent(record, date){
    const dateArray = date.split(' ')
    const day = dateArray[0]
    const hour = parseInt(dateArray[1])
    record.timeInEvents.push({type: "TimeIn", hour: hour, date: day})
    return record
}

function createTimeOutEvent(record, date){
    const dateArray = date.split(' ')
    const day = dateArray[0]
    const hour = parseInt(dateArray[1])
    record.timeOutEvents.push({type: "TimeOut", hour: hour, date: day})
    return record
}

function hoursWorkedOnDate(record, date){
    const clockIn = record.timeInEvents.find(timeInEvent => timeInEvent.date === date)
    const clockOut = record.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)
    const hoursWorked = (clockOut.hour - clockIn.hour)/100 
    return hoursWorked
}

function wagesEarnedOnDate(record, date){
    let hoursWorked = hoursWorkedOnDate(record, date)
    let wagesEarned = hoursWorked * record.payPerHour
    return wagesEarned
}

function allWagesFor(record){
    const dates = record.timeInEvents.map(clockIn => clockIn.date)
    const totalWages = dates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(record, date)
    }, 0)
    return totalWages
} 

function findEmployeeByFirstName(srcArray, firstName){
    const employee = srcArray.find(record => record.firstName === firstName)
    return employee
}

function calculatePayroll(array){
    const payroll = array.reduce((memo, record) => {
        return memo + allWagesFor(record)
    }, 0)
    return payroll
}