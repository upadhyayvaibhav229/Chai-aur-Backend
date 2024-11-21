const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }

// const asynchandler = () => {}
// const asynchandler = (fn) => () => {}
// const asynchandler = () => async () => {}

// const asyncHandler = (fn) =>async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500({
//             success: false,
//             message: error.message
//         }))
//     }
// }