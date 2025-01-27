class UserRole {
    // Bohiba Users
    /**
     * Super Admin:
     * - Full authority over the entire Bohiba platform.
     * - Can create, update, and delete all user roles, including other Super Admins.
     * - Responsible for overseeing and managing the platform at a global level.
     * - Controls all system configurations and critical settings.
     * - Reviews financial and operational reports for strategic decisions.
     * - Resolves escalations and disputes involving other users or platform issues.
     * - Manages platform security, including data protection and compliance.
     * - Can enable, disable, or suspend accounts as needed.
     * - Assigns permissions and roles to Admins, Managers, Developers, and Content Writers.
     * - Ensures the smooth functioning and scalability of the system.
     */
    static superAdmin = `superadmin`;

    /**
     * Admin:
     * - Responsible for managing day-to-day operations within their scope.
     * - Can create and manage user accounts, excluding Super Admins.
     * - Reviews and approves requests related to system access and changes.
     * - Monitors user activity and enforces platform policies.
     * - Prepares reports and analytics to support strategic decisions.
     * - Works closely with Managers and other roles to ensure smooth operations.
     * - Assigns team-specific permissions to ensure data security.
     * - Cannot override settings implemented by Super Admins.
     * - Acts as a liaison between the platform users and Super Admins.
     * - Plays a critical role in the maintenance and stability of the platform.
     */
    static admin = `admin`;

    /**
     * Manager:
     * - Oversees specific teams or departments to achieve goals.
     * - Manages tasks, allocates resources, and tracks progress.
     * - Reports team performance and issues to Admins or Super Admins.
     * - Addresses day-to-day challenges faced by team members.
     * - Coordinates between higher management and staff for smooth operations.
     * - Ensures team adherence to organizational policies and deadlines.
     * - Provides feedback and suggestions for team and system improvements.
     * - Limited access to sensitive data, focusing only on team-specific tasks.
     * - Facilitates communication and collaboration within the team.
     * - Plays a vital role in maintaining productivity and morale.
     */
    static manager = `manager`;

    /**
     * Area Manager:
     * - Manages multiple locations or branches in a specific region.
     * - Ensures all branches operate efficiently and consistently.
     * - Coordinates with branch-level Managers for performance optimization.
     * - Develops and implements strategies to meet regional targets.
     * - Monitors compliance with organizational and legal standards across branches.
     * - Prepares consolidated reports for regional operations and submits them to Admins or Super Admins.
     * - Handles escalations and complex issues from branch-level teams.
     * - Acts as the central contact for corporate management in their region.
     * - Suggests process improvements for regional operations.
     * - Ensures alignment between branch goals and overall company objectives.
     */
    static areaManager = `aeramanager`;

    /**
     * Content Writer:
     * - Specializes in creating high-quality content for the platform.
     * - Writes blogs, articles, marketing materials, and user guides.
     * - Works with design and marketing teams to deliver cohesive campaigns.
     * - Ensures all content aligns with the company’s tone and branding.
     * - Regularly updates content to reflect current trends and relevance.
     * - Manages the publication schedule to meet marketing goals.
     * - Monitors performance metrics (e.g., engagement, SEO rankings) to refine content strategies.
     * - Researches industry trends to produce insightful and accurate content.
     * - Reviews and edits content to maintain quality and professionalism.
     * - Proposes new content ideas to enhance user engagement.
     */
    static contentWriter = `contentwriter`;

    // Mines User
    /**
     * Mine Super Admin:
     * - Responsible for overseeing all mining operations across multiple sites.
     * - Allocates resources and budgets for optimal mine performance.
     * - Ensures all sites comply with safety, environmental, and legal regulations.
     * - Manages high-level decision-making for operational efficiency.
     * - Tracks and reviews performance metrics of individual mines.
     * - Coordinates with external agencies for licenses and compliance.
     * - Assigns roles and responsibilities to Mine Admins and Managers.
     * - Develops and implements long-term strategies for sustainable mining operations.
     * - Resolves complex issues escalated by site-level management.
     * - Ensures operational profitability while maintaining safety standards.
     */
    static minesSuperAdmin = `minesuperadmin`;

    /**
     * Mine Admin:
     * - Manages daily operations within a specific mine.
     * - Monitors worker safety and ensures adherence to regulations.
     * - Tracks production and inventory to meet operational targets.
     * - Prepares reports for the Mine Super Admin regarding performance and incidents.
     * - Oversees maintenance of machinery and tools.
     * - Implements strategies to improve efficiency and reduce costs.
     * - Resolves on-site conflicts and minor escalations.
     * - Trains and supports new workers in operational processes.
     * - Works closely with Mine Managers to maintain daily workflow.
     * - Acts as a primary decision-maker for mine-specific operations.
     */
    static minesAdmin = `mineAdmin`;

    /**
     * Mine Manager:
     * - Directly oversees mining activities and logistics on-site.
     * - Ensures safety protocols are followed during operations.
     * - Tracks worker productivity and allocates resources efficiently.
     * - Monitors machinery usage and schedules maintenance.
     * - Prepares daily reports for the Mine Admin.
     * - Addresses immediate operational challenges and provides solutions.
     * - Ensures compliance with environmental and safety standards.
     * - Coordinates with workers to meet production deadlines.
     * - Acts as a mentor and leader for on-site teams.
     * - Handles emergencies and prepares contingency plans for disruptions.
     */
    static minesManager = `minemanager`;

    /**
     * Fuel Manager:
     * - Oversees fuel consumption and management for operational vehicles.
     * - Tracks fuel usage to prevent wastage or theft.
     * - Reports issues with vehicles or drivers related to fuel efficiency.
     * - Maintains records of fuel purchases and usage for audits.
     * - Provides feedback on driver performance concerning fuel consumption.
     * - Coordinates with Tipper Owners and Truck Managers for optimal fueling schedules.
     * - Marks vehicle fuel statuses in the system for operational transparency.
     * - Suggests improvements for reducing overall fuel costs.
     * - Rates drivers based on their fuel efficiency and driving habits.
     * - Collaborates with management to enhance resource allocation.
     */
    static fuelManager = `fuelmanager`;

    // Mobile Application User
    /**
     * Tipper Owner:
     * - Owns and manages one or more tippers for transportation services.
     * - Tracks vehicle utilization, maintenance, and operational costs.
     * - Hires and oversees drivers for their fleet.
     * - Monitors trip performance and profitability.
     * - Coordinates with Truck Managers for trip scheduling.
     * - Ensures vehicles comply with transportation laws and safety standards.
     * - Reviews financial records to optimize earnings.
     * - Builds relationships with clients for securing contracts.
     * - Plans upgrades or expansions of their fleet for business growth.
     * - Manages disputes or issues arising from daily operations.
     */
    static tipperowner = `truckowner`;

    /**
     * Truck Manager:
     * - Responsible for overseeing fleet operations and driver assignments.
     * - Tracks vehicle routes, schedules, and maintenance.
     * - Communicates with clients for delivery updates and feedback.
     * - Generates operational reports on fleet performance.
     * - Reviews and approves trip logs submitted by drivers.
     * - Coordinates with Tipper Owners to ensure fleet availability.
     * - Monitors compliance with safety and traffic regulations.
     * - Suggests improvements to optimize fleet efficiency.
     * - Resolves day-to-day operational challenges in transportation.
     * - Acts as the central point of contact for drivers and clients.
     */
    static truckmanager = `truckmanager`;

    /**
     * Truck Driver:
     * - Operates assigned trucks or tippers for goods transportation.
     * - Ensures timely and safe delivery of goods.
     * - Adheres to assigned routes and schedules.
     * - Reports delays or issues to Truck Managers immediately.
     * - Monitors vehicle conditions and submits maintenance requests.
     * - Logs mileage, fuel usage, and trip details for record-keeping.
     * - Ensures compliance with traffic rules and safety guidelines.
     * - Represents the company professionally during client interactions.
     * - Attends training to improve skills and safety awareness.
     * - Plays a crucial role in maintaining the company’s reputation for reliability.
     */
    static truckdriver = `truckdriver`;
}

module.exports = UserRole;