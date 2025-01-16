export const emailTemplate = (token) => {
  return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Email Verification</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://res.cloudinary.com/dutwikfzh/image/upload/v1706882054/Hushh/HushLogo_zn8thw.jpg"><img class="logo"
					src="https://www.bing.com/images/search?view=detailV2&ccid=YoC04FIu&id=A1B80C4B87C70041EA59120664863D6A2D9F3024&thid=OIP.YoC04FIurIOYfFarRI-QDAAAAA&mediaurl=https%3a%2f%2fmedia.licdn.com%2fdms%2fimage%2fD4D0BAQGUuHVNh5Cmew%2fcompany-logo_200_200%2f0%2f1687170916369%3fe%3d2147483647%26v%3dbeta%26t%3dP6_Nc1SeXKABsj9GmoFojmNlmcE8Xzkc6R1VKc1ESHU&exph=200&expw=200&q=hushh.ai&simid=608018793962081115&FORM=IRPRST&ck=FADDAD798F8D18130A0283FC98BC6E51&selectedIndex=3&itb=0&ajaxhist=0&ajaxserp=0" alt="Hushh.ai Logo"></a>
			<div class="message">Email Verification</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with Hushh.ai. To complete your registration, please use the following link to verify your account:</p>
				<h2 class="highlight">${token}</h2>
				<p>This link is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:hushh.ai@gmail.com">info@hushh1one.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};
