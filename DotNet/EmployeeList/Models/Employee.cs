using System.Text.Json.Serialization;

namespace EmployeeList.Models
{
    public class Employee
    {
        [JsonPropertyName("employeeId")]
        public int EmployeeId { get; }
        [JsonPropertyName("name")]
        public string EmployeeName { get; }
        [JsonIgnore]
        public int? ManagerId { get; }
        [JsonPropertyName("reports")]
        public List<Employee>? SubEmployees { get; set; }

        public Employee(int empId, string empName, int? mgrId)
        {
            EmployeeId = empId;
            EmployeeName = empName;
            ManagerId = mgrId;
        }
    }
}
