const Session = require("../models/Session");
const Question = require("../models/Question");

/// @desc    Create a new session and linked questions
/// @route   POST /api/sessions/create
/// @access  Private
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId = req.user._id;

    const session = await Session.create({
        user: userId,
        role,
        experience,
        topicsToFocus,
        description,
    });

    const questionDocs = await Promise.all(
        questions.map(async (q)=> {
            const question = await Question.create({
                session: session._id,
                question: q.question,
                answer: q.answer,
            });
            return question._id;
        })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, session })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/// @desc    Get all sessions for the logged-in user
/// @route   GET /api/sessions/my-sessions
/// @access  Private
exports.getMySessions = async (req, res) => {
  try {
    // Your logic here
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/// @desc    Get a session by ID with populated questions
/// @route   GET /api/sessions/:id
/// @access  Private
exports.getSessionById = async (req, res) => {
  try {
    // Your logic here
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/// @desc    Delete a session and its questions
/// @route   DELETE /api/sessions/:id
/// @access  Private
exports.deleteSession = async (req, res) => {
  try {
    // Your logic here
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
