export const ACTIONS = {
    add: "add",
    delete: "delete",
    drop: "drop",
    dragStart: "dragStart",
    back: "back",
    clear: "clear",
    edit: "edit",
    moveNext: "moveNext",
};

export const getBackStatus = (currentStatus) => {
    if (currentStatus === "In Progress") return "To Do";
    if (currentStatus === "Done") return "In Progress";
    if (currentStatus === "Deleted") return "Done"; // Перемещение в Done
    return currentStatus;
};

export const getNextStatus = (currentStatus) => {
    if (currentStatus === "To Do") return "In Progress";
    if (currentStatus === "In Progress") return "Done";
    if (currentStatus === "Done") return "Deleted"; // Перемещение в Deleted
    return currentStatus;
};

export const todoReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.add:
            // Добавляем новый todo в массив todos
            return {
                ...state,
                todos: [...state.todos, action.payload], // Сохраняем новые todos в состоянии
            };
        
        case ACTIONS.moveNext:
            // Перемещаем задачу в следующий статус
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, status: getNextStatus(todo.status) }
                        : todo
                ),
            };

        case ACTIONS.delete:
            // Меняем статус задачи на "Deleted"
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, status: "Deleted" }
                        : todo
                ),
            };

        case ACTIONS.back:
            // Перемещаем задачу в предыдущий статус
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, status: getBackStatus(todo.status) }
                        : todo
                ),
            };

        case ACTIONS.dragStart:
            // Сохраняем id задачи, которую начали перетаскивать
            return {
                ...state,
                draggingId: action.payload,
            };

        case ACTIONS.drop:
            // Обновляем статус задачи, которую отпустили
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === state.draggingId
                        ? { ...todo, status: action.payload }
                        : todo
                ),
                draggingId: null, // Сбрасываем id перетаскиваемой задачи
            };


        case ACTIONS.edit:
            // Редактируем задачу по id
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, title: action.payload.title, description: action.payload.description }
                        : todo
                ),
            };

        case ACTIONS.clear:
            // Очищаем все задачи со статусом "Deleted"
            return {
                ...state,
                todos: state.todos.filter(todo => todo.status !== "Deleted"),
            };


        default:
            return state;
    }
};