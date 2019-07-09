export default function reducer(state, { type, payload }) {
    switch (type) {
        case "SITEBAR_ACTIVE":
            return {
                ...state,
                sitebar: payload
            };
        default:
            return state;
    }
}
