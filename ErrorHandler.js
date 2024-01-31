class ErrorHandler {
  static failed () {
    console.log("Operation failed")
  }
  static invInput() {
    console.log("Invalid input")
  }
}

module.exports = ErrorHandler;