export const ACTIONS = {add: "add",delete:"delete",back:"back",clear:"clear",edit: "edit",moveNext: "moveNext"}

export const getBackStatus = (currentStatus) => {
    if (currentStatus === "In Progress") return "To Do";
    if (currentStatus === "Done") return "In Progress";
    if (currentStatus === "Deleted") return "Done"; // Перемещение в Done
    return currentStatus;
}

export const getNextStatus = (currentStatus) => {
    if (currentStatus === "To Do") return "In Progress";
    if (currentStatus === "In Progress") return "Done";
    if (currentStatus === "Done") return "Deleted"; // Перемещение в Deleted
    return currentStatus;
};


export const todoReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.add:
            return [...state, action.payload];
            case ACTIONS.moveNext:
                return state.map(todo =>
                    todo.id === action.payload ? { ...todo, status: getNextStatus(todo.status) } : todo
                );
        case ACTIONS.delete:
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, status: "Deleted" } : todo
            );
        case ACTIONS.back:
            return state.map(todo =>
                todo.id === action.payload ? { ...todo, status: getBackStatus(todo.status) } : todo
            );
        case ACTIONS.edit:
            return state.map(todo =>
                todo.id === action.payload.index
                    ? { ...todo, title: action.payload.title, description: action.payload.description }
                    : todo
            );
        case ACTIONS.clear:
            return state.filter((todo) => todo.status !== "Deleted");
        default:
            return state;
    }
};