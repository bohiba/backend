# backend
## To start porject run 
```npm run dev```

```email: bohibaofficial@gmail.com```
```password: bohiba@123```


```sudipmahanta999@gmail.com```
```Sudip@123```

# Project Documentation

## Overview
This project is designed to manage mines, their details, and associated operations. The API includes robust error handling and user role management to ensure security and smooth operation.

---

## Common Error Codes
| **Error Code** | **Meaning**                    | **Description**|
|----------------|--------------------------------|---------------------------|
| `BH200`        |     Operation successful       |                           |
| `BH201`        |          Created               |                           |
| `BH204`        |         No Content             | This status code indicates that the request was successful, but the server did not return any data.      |
| `BH301`        |        Moved Permanently       |
| `BH400`        | Bad request (validation error) | 
| `BH401`        |      Unauthorized access       |
| `BH404`        |       Resource not found       |
| `BH500`        |      Internal server error     |

---

## Important and Credentials
| **Role**       | **User ID** | **Password**   |
|----------------|-------------|----------------|
| Super Admin    | `bohibaofficial@gmail.com`   | `bohiba@321`  |
| user           | `sudipmahanta999@gmail.com`  | `Sudip@123`   |

---
# User Roles and Permissions Documentation

## Overview

This document outlines the different user roles and their respective permissions within the platform. Each role defines the level of access and control a user has over various system functionalities. The following roles are categorized by the platform’s operational sectors.

## User Roles

### 1. **Super Admin**
The Super Admin has the highest level of access across the system. Responsibilities include managing the entire platform, overseeing operations, and ensuring the platform’s overall stability.

**Permissions:**
- Full access to all system functionalities.
- Can create, update, and delete all user roles.
- Responsible for high-level system configurations.
- Oversees the entire Bohiba platform operations.
- Assigns roles to Admins, Developers, and Content Writers.
- Access to financial reports and sensitive data.
- Can enable, disable, or suspend accounts globally.
- Controls platform-wide settings and permissions.
- Serves as the final authority for resolving disputes.
- Conducts system maintenance and upgrades.

### 2. **Admin**
The Admin manages the day-to-day operations within their scope. They ensure that users are effectively managed and that operational reports are generated.

**Permissions:**
- Manages daily operations on the platform.
- Can create and manage user accounts within specific scopes.
- Reviews and approves requests related to user access and changes.
- Monitors user activity and enforces platform policies.
- Generates operational reports for decision-making.
- Assigns roles to Managers, Developers, and Writers.
- Manages platform-specific settings and configurations.
- Acts as a liaison between Super Admins and the rest of the team.
- Cannot override Super Admin settings or decisions.
- Acts as the main point of contact for team leaders.

### 3. **Manager**
Managers are responsible for overseeing teams or departments within their scope. They manage tasks, allocate resources, and track the progress of various projects.

**Permissions:**
- Oversees teams and departments within their assigned scope.
- Allocates tasks and tracks the progress of work.
- Provides performance reports to Admins or Super Admins.
- Ensures compliance with organizational policies and deadlines.
- Acts as the main point of contact for team members.
- Can suggest role changes or upgrades for team members.
- Requests additional resources or support from higher management.
- Limited access to sensitive organizational data.
- Bridges communication between staff and higher management.
- Plays a role in improving team efficiency and morale.

### 4. **Area Manager**
The Area Manager manages operations across multiple branches or locations in a region. They ensure consistency and efficiency in regional operations.

**Permissions:**
- Manages operations across multiple branches or locations.
- Monitors performance and ensures regional consistency.
- Develops strategies to meet regional business goals.
- Coordinates with higher management for resources and support.
- Reviews regional reports on sales and operational performance.
- Suggests process improvements for regional operations.
- Handles escalations that local Managers cannot resolve.
- Ensures all branches comply with company policies and standards.
- Implements company strategies at the regional level.
- Acts as a liaison between branch-level teams and corporate management.

### 5. **Content Writer**
Content Writers are responsible for creating, editing, and managing written content on the platform. Their focus is on producing high-quality content that aligns with the company's branding and marketing goals.

**Permissions:**
- Creates and manages written content, including blogs, articles, and marketing materials.
- Collaborates with the marketing and design teams.
- Reviews and edits content for grammar, quality, and brand consistency.
- Researches and writes engaging, accurate, and relevant content.
- Manages the content publication schedule.
- Analyzes content performance (e.g., views, engagement).
- Stays updated on industry trends to improve content quality.
- Suggests new content ideas and strategies.
- Monitors the performance of content across platforms.
- Coordinates with other departments for content-related campaigns.

---

## Mines User Roles

### 6. **Mine Super Admin**
The Mine Super Admin oversees multiple mine operations. They handle the strategic and regulatory aspects of the mining operations.

**Permissions:**
- Manages operations across multiple mines.
- Ensures compliance with safety, environmental, and legal regulations.
- Allocates budgets and resources to mines.
- Assigns roles to Mine Admins and Managers.
- Reviews mine performance metrics and growth plans.
- Develops long-term strategies for mine operations.
- Coordinates with regulatory bodies for compliance.
- Handles escalations that cannot be resolved by site-level management.
- Reviews financial reports and monitors operational performance.
- Plays a key role in ensuring mine profitability and sustainability.

### 7. **Mine Admin**
Mine Admins are responsible for the day-to-day operations within a specific mine site. They manage resources, production, and worker safety.

**Permissions:**
- Manages daily operations at a specific mine.
- Tracks production rates and meets operational targets.
- Ensures safety and regulatory compliance within the mine.
- Reviews inventory and resource utilization.
- Approves work schedules and task allocations.
- Coordinates with Mine Super Admins for resource allocation.
- Prepares reports on performance and incidents.
- Trains new workers on operational processes.
- Implements mine-specific operational strategies.
- Manages mine-related budgets and cost-control measures.

### 8. **Mine Manager**
Mine Managers oversee the logistics and daily operations at a mine site. They focus on maintaining production efficiency and safety.

**Permissions:**
- Oversees daily mining operations and logistics.
- Ensures efficient use of resources and personnel.
- Schedules maintenance for mining equipment.
- Monitors worker productivity and provides performance feedback.
- Prepares daily operational reports for the Mine Admin.
- Addresses safety and compliance issues on-site.
- Resolves operational challenges and escalates major issues.
- Supports emergency response plans for on-site incidents.
- Ensures all operations adhere to environmental guidelines.
- Monitors worker morale and addresses concerns.

---

## Mobile Application User Roles

### 9. **Tipper Owner**
Tipper Owners are responsible for managing their fleet of tippers and trucks, as well as ensuring the efficient operation of their business.

**Permissions:**
- Owns and manages one or more tippers.
- Hires and manages drivers for the fleet.
- Tracks vehicle performance, usage, and operational costs.
- Ensures the timely maintenance and servicing of tippers.
- Coordinates with Truck Managers for trip assignments.
- Manages operational and fuel expenses for vehicles.
- Reviews performance and earnings from trips.
- Secures transportation contracts with clients.
- Manages disputes and issues related to transportation operations.
- Plans for fleet upgrades or vehicle replacements.

### 10. **Truck Manager**
Truck Managers are responsible for assigning vehicles and drivers to transportation tasks, ensuring operational efficiency.

**Permissions:**
- Assigns trucks to transportation tasks.
- Monitors driver performance and vehicle usage.
- Reviews maintenance reports for vehicles.
- Communicates with clients regarding delivery schedules.
- Tracks fuel usage and operational costs for the fleet.
- Generates reports on fleet performance.
- Ensures vehicles comply with traffic and safety regulations.
- Coordinates with Tipper Owners for vehicle availability.
- Manages truck-related operational issues.
- Acts as the main contact for clients and drivers.

### 11. **Truck Driver**
Truck Drivers are responsible for operating assigned trucks or tippers, ensuring timely and safe deliveries.

**Permissions:**
- Operates assigned vehicles for transportation tasks.
- Ensures safe and on-time delivery of goods.
- Follows the assigned route and schedule.
- Monitors truck condition and reports issues promptly.
- Completes daily logs for mileage and fuel usage.
- Ensures compliance with safety and traffic regulations.
- Communicates with Truck Managers about delays or issues.
- Represents the company in a professional manner during deliveries.
- Attends training to improve operational and safety skills.
- Plays a key role in maintaining the company’s reputation.

-----
## License
This project is licensed under the [MIT License](LICENSE).
