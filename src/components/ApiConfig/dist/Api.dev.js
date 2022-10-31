"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveCollections = exports.RemoveAppointmentByInstructorById = exports.RemoveStudentById = exports.RemoveInstructorById = exports.RemoveLabById = exports.RemoveExamBookedByStudentId = exports.RemoveAppointmentByLabId = exports.expiredAppointment = exports.DownloadExcel = exports.getAllStudents = exports.getAllInstructorId = exports.getStudentsByInstructorId = exports.getAllLabs = exports.getAllBookedLabByStudentId = exports.getAllBookedLabByInstructorId = exports.getAllAvailableLabs = exports.getAllDivision = exports.getInstructors = exports.getInstructorById = exports.UpdateStudentAttemptsById = exports.UpdateStudentById = exports.UpdateInstructorById = exports.UpdateLabById = exports.getAllTestAvailableForStudent = exports.StudentsLogin = exports.InstructorsLogin = exports.StudentReserveNewTest = exports.NewLabBooking = exports.LabRegistration = exports.StudentSingleRegistration = exports.InstructorFileRegistration = exports.InstructorSingleRegistration = void 0;

var _ApiConfig = _interopRequireDefault(require("./ApiConfig"));

var _axios = _interopRequireDefault(require("axios"));

var _sweetalert = _interopRequireDefault(require("sweetalert2"));

var _helperMethods = require("../helperMethods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//================== Helper Method ============================||
var config = {
  headers: {}
};

if ((0, _helperMethods.checkStorage)()) {
  config.headers['Authorization'] = "Bearer ".concat((0, _helperMethods.getToken)());
} //================== Helper Method ============================||
//---------------All POST Request-------------------//
//========================= Register Single Instructor =============================\\


var InstructorSingleRegistration = function InstructorSingleRegistration(req) {
  return regeneratorRuntime.async(function InstructorSingleRegistration$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (0, _axios["default"])({
            method: 'POST',
            url: _ApiConfig["default"] + 'api/Instructor/register',
            data: {
              FullName: req.FullName,
              Email: req.Email,
              password: req.password,
              InstructorId: req.InstructorId,
              Phone: req.Phone,
              InstructorReference: req.InstructorReference,
              Subject: req.Subject,
              HasPermissionTo: req.HasPermissionTo
            },
            headers: {
              'Authorization': "Bearer ".concat((0, _helperMethods.getToken)())
            }
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}; //========================= Add Instructors From File =============================\\


exports.InstructorSingleRegistration = InstructorSingleRegistration;

var InstructorFileRegistration = function InstructorFileRegistration(File) {
  var formData;
  return regeneratorRuntime.async(function InstructorFileRegistration$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          formData = new FormData();
          formData.append("file", File);
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/upload/Instructor/register/fromFile"), formData, config).then(function (res) {
            if (res === "Error") {
              _sweetalert["default"].fire({
                title: " ".concat(res.data.message),
                icon: 'error',
                showCancelButton: false
              });
            }

            window.location.reload(false);
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 4:
          return _context2.abrupt("return", _context2.sent);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //========================= Register Single Student =============================\\


exports.InstructorFileRegistration = InstructorFileRegistration;

var StudentSingleRegistration = function StudentSingleRegistration(req) {
  return regeneratorRuntime.async(function StudentSingleRegistration$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", (0, _axios["default"])({
            method: 'POST',
            url: _ApiConfig["default"] + 'api/Student/register',
            data: {
              FullName: req.FullName,
              Email: req.Email,
              password: req.password,
              StudentId: req.StudentId,
              Phone: req.Phone,
              StudentReference: req.StudentReference,
              Subject: req.Subject,
              Instructor_id: req.Instructor_id
            },
            headers: {
              'Authorization': "Bearer ".concat((0, _helperMethods.getToken)())
            }
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //========================= Register Single Student =============================\\


exports.StudentSingleRegistration = StudentSingleRegistration;

var LabRegistration = function LabRegistration(req) {
  return regeneratorRuntime.async(function LabRegistration$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/add/new/lab"), req, config));

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.LabRegistration = LabRegistration;

var NewLabBooking = function NewLabBooking(req, id) {
  return regeneratorRuntime.async(function NewLabBooking$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/instructor/booking/new/lab/").concat(id), req, config));

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.NewLabBooking = NewLabBooking;

var StudentReserveNewTest = function StudentReserveNewTest(req, id) {
  return regeneratorRuntime.async(function StudentReserveNewTest$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/student/book/new/test/").concat(id), req, config));

        case 2:
          return _context6.abrupt("return", _context6.sent);

        case 3:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.StudentReserveNewTest = StudentReserveNewTest;

var InstructorsLogin = function InstructorsLogin(req) {
  return regeneratorRuntime.async(function InstructorsLogin$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/Instructor/login"), req));

        case 2:
          return _context7.abrupt("return", _context7.sent);

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.InstructorsLogin = InstructorsLogin;

var StudentsLogin = function StudentsLogin(req) {
  return regeneratorRuntime.async(function StudentsLogin$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/Student/login"), req));

        case 2:
          return _context8.abrupt("return", _context8.sent);

        case 3:
        case "end":
          return _context8.stop();
      }
    }
  });
};

exports.StudentsLogin = StudentsLogin;

var getAllTestAvailableForStudent = function getAllTestAvailableForStudent(id, req) {
  return _axios["default"].post("".concat(_ApiConfig["default"], "api/get/all/available/test/byStudent/").concat(id), req, config);
}; //---------------All Update-----------------------//


exports.getAllTestAvailableForStudent = getAllTestAvailableForStudent;

var UpdateLabById = function UpdateLabById(req, id) {
  return regeneratorRuntime.async(function UpdateLabById$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/update/lab/").concat(id), req, config));

        case 2:
          return _context9.abrupt("return", _context9.sent);

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
};

exports.UpdateLabById = UpdateLabById;

var UpdateInstructorById = function UpdateInstructorById(req, id) {
  return regeneratorRuntime.async(function UpdateInstructorById$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/update/Instructor/by/").concat(id), req, config));

        case 2:
          return _context10.abrupt("return", _context10.sent);

        case 3:
        case "end":
          return _context10.stop();
      }
    }
  });
};

exports.UpdateInstructorById = UpdateInstructorById;

var UpdateStudentById = function UpdateStudentById(req, id) {
  return regeneratorRuntime.async(function UpdateStudentById$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/update/Student/by/").concat(id), req, config));

        case 2:
          return _context11.abrupt("return", _context11.sent);

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
};

exports.UpdateStudentById = UpdateStudentById;

var UpdateStudentAttemptsById = function UpdateStudentAttemptsById(req, id) {
  return regeneratorRuntime.async(function UpdateStudentAttemptsById$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/instructor/update/Student/Attempts/").concat(id), req, config));

        case 2:
          return _context12.abrupt("return", _context12.sent);

        case 3:
        case "end":
          return _context12.stop();
      }
    }
  });
}; //---------------All GET Request-------------------//


exports.UpdateStudentAttemptsById = UpdateStudentAttemptsById;

var getInstructorById = function getInstructorById(id) {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/get/all/Instructor/").concat(id));
};

exports.getInstructorById = getInstructorById;

var getInstructors = function getInstructors() {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/get/all/Instructor"), config);
};

exports.getInstructors = getInstructors;

var getAllDivision = function getAllDivision() {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/Find/All/Divisions"), config);
};

exports.getAllDivision = getAllDivision;

var getAllAvailableLabs = function getAllAvailableLabs() {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/get/all/available/lab"), config);
};

exports.getAllAvailableLabs = getAllAvailableLabs;

var getAllBookedLabByInstructorId = function getAllBookedLabByInstructorId(id) {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/Find/all/booked/Lab/").concat(id), config);
};

exports.getAllBookedLabByInstructorId = getAllBookedLabByInstructorId;

var getAllBookedLabByStudentId = function getAllBookedLabByStudentId(id) {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/Find/all/booked/test/").concat(id), config);
};

exports.getAllBookedLabByStudentId = getAllBookedLabByStudentId;

var getAllLabs = function getAllLabs() {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/get/all/lab"));
};

exports.getAllLabs = getAllLabs;

var getStudentsByInstructorId = function getStudentsByInstructorId(id) {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/Find/All/Division/by/instructorId/").concat(id), config);
};

exports.getStudentsByInstructorId = getStudentsByInstructorId;

var getAllInstructorId = function getAllInstructorId() {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/get/all/InstructorId"), config);
};

exports.getAllInstructorId = getAllInstructorId;

var getAllStudents = function getAllStudents() {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/get/all/Student"), config);
};

exports.getAllStudents = getAllStudents;

var DownloadExcel = function DownloadExcel() {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/export/data"), {
    responseType: 'arraybuffer',
    headers: {
      'Authorization': "Bearer ".concat((0, _helperMethods.getToken)())
    }
  });
};

exports.DownloadExcel = DownloadExcel;

var expiredAppointment = function expiredAppointment() {
  return _axios["default"].get("".concat(_ApiConfig["default"], "api/Check/out/date"), config);
}; //---------------All remove Request-------------------//


exports.expiredAppointment = expiredAppointment;

var RemoveAppointmentByLabId = function RemoveAppointmentByLabId(req, id) {
  return regeneratorRuntime.async(function RemoveAppointmentByLabId$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/remove/appointment/by/Lab/").concat(id), req, config));

        case 2:
          return _context13.abrupt("return", _context13.sent);

        case 3:
        case "end":
          return _context13.stop();
      }
    }
  });
};

exports.RemoveAppointmentByLabId = RemoveAppointmentByLabId;

var RemoveExamBookedByStudentId = function RemoveExamBookedByStudentId(id, req) {
  return regeneratorRuntime.async(function RemoveExamBookedByStudentId$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_ApiConfig["default"], "api/student/delete/booked/test/").concat(id), req, config));

        case 2:
          return _context14.abrupt("return", _context14.sent);

        case 3:
        case "end":
          return _context14.stop();
      }
    }
  });
};

exports.RemoveExamBookedByStudentId = RemoveExamBookedByStudentId;

var RemoveLabById = function RemoveLabById(id) {
  return _axios["default"]["delete"]("".concat(_ApiConfig["default"], "api/delete/lab/by/").concat(id), config);
};

exports.RemoveLabById = RemoveLabById;

var RemoveInstructorById = function RemoveInstructorById(id) {
  return _axios["default"]["delete"]("".concat(_ApiConfig["default"], "api/remove/instructor/by/").concat(id), config);
};

exports.RemoveInstructorById = RemoveInstructorById;

var RemoveStudentById = function RemoveStudentById(id) {
  return _axios["default"]["delete"]("".concat(_ApiConfig["default"], "api/remove/student/by/").concat(id), config);
};

exports.RemoveStudentById = RemoveStudentById;

var RemoveAppointmentByInstructorById = function RemoveAppointmentByInstructorById(id, data) {
  return _axios["default"].post("".concat(_ApiConfig["default"], "api/Instructor/delete/booked/lab/by/").concat(id), data, config);
}; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!//


exports.RemoveAppointmentByInstructorById = RemoveAppointmentByInstructorById;

var RemoveCollections = function RemoveCollections() {
  return _axios["default"]["delete"]("".concat(_ApiConfig["default"], "api/remove/collections"), config);
};

exports.RemoveCollections = RemoveCollections;