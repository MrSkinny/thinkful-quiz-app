/** 
 * QUESTIONS (Array)
 *   Data store for all quiz questions
 */

var QUESTIONS = [
  
  /** 
   * QUESTION (Object)
   * @q (String) - text of questions
   * @answers (Array) - answer strings
   * @correctAnswer (Int) - index value of correct answer from @answers
   * @correctAnswerText (String) - explanation text to display in answer view
   */

  {
    q: 'What is the capital of England?',
    answers: [
      'Paris',
      'Berlin',
      'Washington DC',
      'London'
    ],
    correctAnswer: 3,
    correctAnswerText: 'This is some random trivia information about the correct answer.'
  },
  {
    q: 'What is the largest river in the world?',
    answers: [
      'Nile',
      'Amazon',
      'Mississipi',
      'Rio Grande'
    ],
    correctAnswer: 0,
    correctAnswerText: 'This is some random trivia information about the correct answer.'
  }
];

/**
 * TEMPLATES (Object)
 *   Methods that generate blocks of HTML to render into the view.
 */

var TEMPLATES = {
  fetchQuestion: function(index){
    var i,
        html = '',
        question = QUESTIONS[index];

    html += "<p>" + question.q + "</p>";
    html += "<div class='answer-list'>";
    for (i = 0; i < question.answers.length; i++){
      html += "<div class='answer-item' id='answer-item-" + i + "'>" + question.answers[i] + "</div>";
    }
    html += "<div class='feedback'></div>"
    html += "</div>";

    return html;
  },
  
  fetchAnswer: function(index){
    var html = '',
        question = QUESTIONS[index],
        answer = question.answers[question.correctAnswer];
        
    html += "<div class='answer-text'>";
    html +=   "<p>You answered: <strong>" + answer +"</strong></p>";
    html +=   "<p>" + question.correctAnswerText + "</p>";
    
    if ( GAME.currentQuestion !== (QUESTIONS.length - 1) ) {
      html +=   "<button id='next-question'>Next Question</button>";
    } else {
      html +=   "<button id='start-quiz'>New Game</button>";  
    }
    
    html += "</div>";
        
    return html;
  }
}

/**
 * GAME (Object)
 *   Properties and methods to manipulate the Game's state
 */
var GAME = {
  
  /** 
   * running (Boolean) - current game state
   */
  running: false,
  
  /**
   * currentQuestion (Int) - current question in active game, index value of QUESTIONS array
   */
  currentQuestion: 0,
  
  /**
   * startNewGame (Function)
   *   Reset game state properties and updates view
   */
  startNewGame: function(){
    this.running = true;
    this.currentQuestion = 0;
    
    VIEW.updateProgress();
    VIEW.displayQuestion(this.currentQuestion);
  },
  
  
  /**
   * checkAnswer (Function)
   *   @qIndex (param) - int index value of QUESTIONS array 
   *   @aIndex (param) - int index value of ANSWERS array within question
   * 
   *   Returns true/false comparing current question correct answer vs. user selected answer
   */
  checkAnswer(qIndex, aIndex){
    return QUESTIONS[qIndex].correctAnswer == aIndex;
  },
  
  /**
   * nextQuestion (Function)
   *   Increments currentQuestion 
   */
  
  nextQuestion() {
    this.currentQuestion++;
  }
  
}


/**
 * VIEW (Object)
 *   Methods related to updating the view
 */
var VIEW = {
  
  /** 
   * hideAll (Function)
   *   Remove all panels from view -- recommend running this before changing to a new view
   */
  hideAll: function(){
    $('#intro').hide();
    $('#question').hide();
    $('#answer').hide();
    $('#score').hide();
  },

  /**
   * updateProgress (Function)
   *   Shows user which question they're on  
   */  
  updateProgress: function(){
    $('#progress').html("You're on question " + (GAME.currentQuestion + 1) + " of " + QUESTIONS.length);
  },
  
  /**
   * displayQuestion (Function)
   *   @index (param)
   *   Pull HTML template and display question at index of provided param
   */
  displayQuestion: function(index){
    this.hideAll();
    this.updateProgress();
    var questionHtml = TEMPLATES.fetchQuestion(index);
    
    $('#question').html(questionHtml).show();
  },
  
  /**
   * displayAnswer (Function)
   *   @index (param)
   *   Pull HTML and display answer from index at provided param
   */
  displayAnswer: function(index){
    this.hideAll();
    var answerHtml = TEMPLATES.fetchAnswer(index);
    
    $('#answer').html(answerHtml).show();
  },
  
  /**
   * wrongAnswer (Function)
   *   @index (param)
   *   Reset background color of all answers, set user selected answer to red and display feedback
   */
  wrongAnswer: function(index){
    $('.answer-item').css('background-color', '#fff');
    $('#answer-item-' + index).css('background-color', '#f00');
    $('.feedback').text('Sorry, try again.');
  }
  
};


/**********
 * Listeners added when DOM is ready:
 **********/

$(function(){

  $('#app').on('click', '#start-quiz', function(e){
    GAME.startNewGame();
  });  
  
  $('#app').on('click', '.answer-item', function(e){
    var answerIndex = e.target.id.slice(-1);
    var userGuessCorrect = GAME.checkAnswer(GAME.currentQuestion, e.target.id.slice(-1))
    
    if (userGuessCorrect) {
      VIEW.displayAnswer(GAME.currentQuestion);
    } else {
      VIEW.wrongAnswer(answerIndex);
    }
  });

  $('#app').on('click', '#next-question', function(e){
    GAME.nextQuestion();
    VIEW.updateProgress();
    VIEW.displayQuestion(GAME.currentQuestion);
  });
  
});
