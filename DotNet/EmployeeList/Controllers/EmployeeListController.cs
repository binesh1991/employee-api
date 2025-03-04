﻿using EmployeeList.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace EmployeeList.Controllers
{
    [ApiController]
    [Route("employeelist")]
    public class EmployeeListController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] RequestClass csvContent)
        {
            List<Employee> employees = new List<Employee>();

            string[] records = csvContent.CsvContent.Split("\n", StringSplitOptions.None);
            for (int i = 1; i < records.Length; i++)
            {
                if (string.IsNullOrWhiteSpace(records[i]))
                {
                    continue;
                }

                string[] emp = records[i].Split(',');
                int? mgrId = !string.IsNullOrEmpty(emp[2]) ? int.Parse(emp[2]) : null;
                Employee empl = new Employee(int.Parse(emp[0]), emp[1], mgrId);
                employees.Add(empl);
            }

            List<Employee> hierarchical = GenerateHierarchy(employees, null);

            return Ok(JsonSerializer.Serialize(hierarchical));
        }

        private static List<Employee> GenerateHierarchy(List<Employee> employees, int? mgrId)
        {
            return employees
            .Where(e => e.ManagerId == mgrId)
            .Select(e => new Employee(e.EmployeeId, e.EmployeeName, e.ManagerId)
            {
                SubEmployees = GenerateHierarchy(employees, e.EmployeeId)
            }).ToList();
        }
    }
}
