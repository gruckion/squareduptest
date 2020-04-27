<img width="419px" src="https://i.imgur.com/2In0IwT.png" />
<img width="419px" src="https://i.imgur.com/ptyFNx9.png" />
<img width="419px" src="https://i.imgur.com/TelMbOX.png" />

# Setup

You will need the Amplify CLI tool in order to run provision the backend of this project on AWS.

[Setting up Amplify CLI tool](https://docs.amplify.aws/cli/start/install#install-and-configure-the-amplify-cli)

`$ npm install -g @aws-amplify/cli`

Next configure Amplify by connecting it to your AWS account. You will ask you to sign into the AWS Console.

`$ amplify configure`

Once you’re signed in, Amplify CLI will ask you to create an IAM user.

Create a user with AdministratorAccess to your account to provision AWS resources for you like AppSync, Cognito etc.

Once the user is created, Amplify CLI will ask you to provide the `accessKeyId` and the `secretAccessKey` to connect Amplify CLI with your newly created IAM user.

Now you can clone the github repo via the `amplify init` command which will provision the AWS backend for you.

`amplify inapp https://github.com/gruckion/squareduptest`

When prompted `? Do you want to use an AWS profile? (Y/n)` enter yes and choose a profile. Alternatively select no and enter your API key and secret.

[Information on how to generate an API key and secret](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-setup-api-key-with-console.html)

Once the backend has been provisioned react scripts will automatically start the express server and launch chrome.
