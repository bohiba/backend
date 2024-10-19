class DateTimeGenerator {
    static dateTimeStampGenerator() {
        const currentDate = new Date(); // Current date and time
        // Extract date and time strings without timezone information
        const dateString = currentDate.toDateString(); // "Fri Apr 19 2024"
        const timeString = currentDate.toTimeString().slice(0, 8); // "10:20:08"

        // Combine date and time strings
        const dateTimeString = `${dateString} ${timeString}`;
        return dateTimeString;
    }

}

module.exports = DateTimeGenerator;