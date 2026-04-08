import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../core/models/interfaces';

@Pipe({
    name: 'employeeFilter',
    standalone: true
})
export class EmployeeFilterPipe implements PipeTransform {
    transform(employees: Employee[] | null, searchText: string, department: string): Employee[] {
        if (!employees) return [];
        if (!searchText && !department) return employees;

        return employees.filter(employee => {
            const matchesSearch = !searchText ||
                employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchText.toLowerCase());

            const matchesDept = !department || employee.department === department;

            return matchesSearch && matchesDept;
        });
    }
}
