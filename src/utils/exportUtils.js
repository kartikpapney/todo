/**
 * Utility functions for exporting task data
 */

/**
 * Convert tasks to CSV format and trigger a download
 * @param {Array} items - Array of task objects
 * @param {string} exportType - The type of export ('all' or 'filtered')
 * @param {string} selectedDate - The currently selected date (for filename)
 */
export const exportTasksToCSV = (items, exportType, selectedDate) => {
  // Format options for dates
  const dateFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  // Headers for the CSV
  const csvHeaders = ['Task', 'Status', 'Date'];
  
  // Convert each task to a CSV row
  const csvRows = items.map(item => {
    return [
      // Escape quotes in task names to prevent CSV formatting issues
      `"${item.name.replace(/"/g, '""')}"`,
      item.done ? 'Completed' : 'Pending',
      new Date(item.createdAt).toLocaleDateString('en-US', dateFormatOptions)
    ];
  });
  
  // Combine headers and rows
  const csvContent = [
    csvHeaders.join(','),
    ...csvRows.map(row => row.join(','))
  ].join('\n');
  
  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  
  // Set the filename based on export type
  const filename = exportType === 'all' 
    ? `all_tasks_${new Date().toISOString().split('T')[0]}.csv` 
    : `tasks_${selectedDate}.csv`;
  
  link.setAttribute('download', filename);
  
  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);
  
  // Trigger the download
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
