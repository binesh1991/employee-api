namespace EmployeeList.Models
{
    public class Employee
    {
        public int EmployeeId { get; }
        public string EmployeeName { get; }
        public int? ManagerId { get; }
        public List<Employee>? SubEmployees { get; set; }

        public Employee(int empId, string empName, int? mgrId)
        {
            EmployeeId = empId;
            EmployeeName = empName;
            ManagerId = mgrId;
        }
    }
}
