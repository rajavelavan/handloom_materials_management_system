const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      background-color: #374151; /* slate-800 */
      margin: 0;
      padding: 0;
    }
    
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff; /* white */
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      color: #000; /* black text */
    }
    
    .header {
      background-color: #374151; /* slate-800 */
      color: white;
      padding: 10px;
      text-align: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    
    .content {
      padding: 20px;
    }
    
    .card {
      background-color: #374151; /* slate-800 */
      color: white;
      padding: 10px;
      border-radius: 8px;
    }
    
    .font-bold {
      font-weight: bold;
    }
    bold.italic {
        font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to HMMS!</h2>
    </div>
    <div class="content">
      <p>Dear {{ name }},</p>
      <p>We are excited to have you on board.</p>
      <p>To get started, please verify your account using the information provided below:</p>
      <div class= "card">
        <p>Your Email: {{ userMail }}</p>
        <p>One Time Password: <bold>{{ otp }}</bold></p>
      </div>
      <p>Use this OTP to complete your account verification.</p>
    </div>
  </div>
</body>
</html>`;

export default emailTemplate;
