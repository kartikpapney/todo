import React, { useState } from 'react';
import Button from './Button';

function Items({ props }) {
    const { items, setItems, searchTerm, selectedDate } = props;
    const [editingTask, setEditingTask] = useState(null);
    const [editValue, setEditValue] = useState('');
    
    const toggleTask = (itemName) => {
        const updatedItems = items.map(item => 
            item.name === itemName 
                ? { ...item, done: !item.done }
                : item
        );
        setItems(updatedItems);
    }

    const deleteTask = (itemName) => {
        const updatedItems = items.filter(item => item.name !== itemName);
        setItems(updatedItems);
    }

    const startEditing = (item) => {
        setEditingTask(item.name);
        setEditValue(item.name);
    }

    const saveEdit = () => {
        if (editValue.trim() === '') {
            setEditingTask(null);
            return;
        }
        
        const updatedItems = items.map(item => 
            item.name === editingTask 
                ? { ...item, name: editValue.trim() }
                : item
        );
        setItems(updatedItems);
        setEditingTask(null);
        setEditValue('');
    }

    const cancelEdit = () => {
        setEditingTask(null);
        setEditValue('');
    }

    // Move task to next day
    const moveTaskToNextDay = (itemName) => {
        const updatedItems = items.map(item => {
            if (item.name === itemName) {
                const currentDate = new Date(item.createdAt);
                currentDate.setDate(currentDate.getDate() + 1);
                const nextDay = currentDate.toISOString().split('T')[0];
                return { ...item, createdAt: nextDay };
            }
            return item;
        });
        setItems(updatedItems);
    }

    // Move task to previous day
    const moveTaskToPrevDay = (itemName) => {
        const updatedItems = items.map(item => {
            if (item.name === itemName) {
                const currentDate = new Date(item.createdAt);
                currentDate.setDate(currentDate.getDate() - 1);
                const prevDay = currentDate.toISOString().split('T')[0];
                return { ...item, createdAt: prevDay };
            }
            return item;
        });
        setItems(updatedItems);
    }

    // Filter items based on search term and selected date
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes((searchTerm || '').toLowerCase());
        const matchesDate = item.createdAt === selectedDate;
        return matchesSearch && matchesDate;
    });

    // Sort items: incomplete tasks first (by newest), then completed tasks (by oldest)
    const sortedItems = filteredItems.sort((a, b) => {
        // If completion status is different, put incomplete tasks first
        if (a.done !== b.done) {
            return a.done - b.done;
        }
        // If both have same completion status, maintain original order
        // (newer items will naturally be at the top due to unshift in Search component)
        return 0;
    });

    // Helper function to get relative date
    const getRelativeDate = (dateStr) => {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
        
        if (dateStr === today) return "Today";
        if (dateStr === yesterday) return "Yesterday";
        if (dateStr === tomorrow) return "Tomorrow";
        return new Date(dateStr).toLocaleDateString();
    };
    
    return (
        <div>
            {/* Task statistics */}
            {sortedItems.length > 0 && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Tasks for {getRelativeDate(selectedDate)}</span>
                        <span>
                            {sortedItems.filter(item => item.done).length} of {sortedItems.length} completed
                        </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-black h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${sortedItems.length > 0 ? (sortedItems.filter(item => item.done).length / sortedItems.length) * 100 : 0}%`
                            }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Task list */}
            <div className="space-y-2">
            {
                sortedItems.map((item, idx) => {
                    const isEditing = editingTask === item.name;
                    
                    return (
                        <div 
                            key={`${item.name}-${idx}`}
                            className={`group flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                                item.done 
                                    ? 'bg-gray-50 border-gray-200' 
                                    : 'bg-white border-gray-300 shadow-sm'
                            }`}
                        >
                            {/* Task content */}
                            <div className="flex-1 mr-3">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onKeyUp={(e) => {
                                            if (e.key === 'Enter') {
                                                saveEdit();
                                            } else if (e.key === 'Escape') {
                                                cancelEdit();
                                            }
                                        }}
                                        onBlur={saveEdit}
                                        autoFocus
                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                ) : (
                                    <div 
                                        className={`select-none transition-all duration-200 cursor-pointer ${
                                            item.done 
                                                ? 'text-gray-400 line-through font-light' 
                                                : 'text-gray-800 font-medium'
                                        }`}
                                        onClick={() => toggleTask(item.name)}
                                    >
                                        {item.name}
                                    </div>
                                )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {isEditing ? (
                                    <>
                                        <Button
                                            onClick={saveEdit}
                                            value={"✓"}
                                            variant="secondary"
                                            className="w-8 h-8 flex items-center justify-center text-green-600 hover:text-green-700"
                                        />
                                        <Button
                                            onClick={cancelEdit}
                                            value={"✕"}
                                            variant="secondary"
                                            className="w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-700"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveTaskToPrevDay(item.name);
                                            }}
                                            value={"←"}
                                            variant="secondary"
                                            className="w-8 h-8 flex items-center justify-center p-0"
                                            title="Move to previous day"
                                        />
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                moveTaskToNextDay(item.name);
                                            }}
                                            value={"→"}
                                            variant="secondary"
                                            className="w-8 h-8 flex items-center justify-center p-0"
                                            title="Move to next day"
                                        />
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                startEditing(item);
                                            }}
                                            value={"✎"}
                                            variant="edit"
                                            className="w-8 h-8 flex items-center justify-center p-0"
                                        />
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteTask(item.name);
                                            }}
                                            value={"×"}
                                            variant="delete"
                                            className="w-8 h-8 flex items-center justify-center p-0"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

export default Items;
