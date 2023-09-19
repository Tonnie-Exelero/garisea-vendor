// ** Demo Components Imports
import Email from 'src/views/apps/email/Email'

const EmailApp = () => <Email folder='inbox' />

EmailApp.contentHeightFixed = true

EmailApp.acl = {
  action: "read",
  subject: "email",
};

export default EmailApp
