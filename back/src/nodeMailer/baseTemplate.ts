export function basebuild(clientUserName:string){
let emailBodyTemplate: string = `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<meta name="x-apple-disable-message-reformatting">
	<title></title>
	<!--[if mso]>
	<noscript>
		<xml>
			<o:OfficeDocumentSettings>
				<o:PixelsPerInch>96</o:PixelsPerInch>
			</o:OfficeDocumentSettings>
		</xml>
	</noscript>
	<![endif]-->
	<style>
		table, td, div, h1, p {font-family: Arial, sans-serif;}
	</style>
</head>
<body style="margin:0;padding:0;">
	<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
		<tr>
			<td align="center" style="padding:0;">
				<table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
					<tr>
						<td style="padding:36px 30px 42px 30px;">
							<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
								<tr>
									<td style="padding:0 0 36px 0;color:#153643;">
										<h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">
                                            Thanks For Joining My Site ` + clientUserName + `!
                                        </h1>
										<p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                            Example text body 1
                                        </p>
										<p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                            <a href="https://devdylan.me" style="color:#ee4c50;text-decoration:underline;">
                                                DevDylan.me
                                            </a></p>
									</td>
								</tr>
								<tr>
									<td style="padding:0;">
										<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
											<tr>
												<td style="width:260px;padding:0;vertical-align:top;color:#153643;">
													<p style="margin:0 0 25px 0;font-size:16px;line-height:24px;
													font-family:Arial,sans-serif;">
														<p style="margin:0 0 12px 0;font-size:16px;line-height:24px;
														font-family:Arial,sans-serif;">
														
															Text body test 2    
														
														</p>
													<p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                        <a href="https://devdylan.me" style="color:#ee4c50;text-decoration:underline;">
                                                           got this by mistake? register an account!
                                                        </a>
													</p>
												</td>
												<td style="width:20px;padding:0;font-size:0;line-height:0;">&nbsp;</td>
												<td style="width:260px;padding:0;vertical-align:top;color:#153643;">
													<p style="margin:0 0 25px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                       <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                            test body 4
                                                        </p>
													<p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                                        <a href="https://devdylan.com" style="color:#ee4c50;text-decoration:underline;">
                                                            Sign In Here!
														</a>
													</p>
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td style="padding:30px;background:#ee4c50;">
							<table role="presentation" style="width:100%;border-collapse:collapse;
							border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
								<tr>
									<td style="padding:0;width:50%;" align="left">
										<p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
											&reg;Dylan Poll-2021<br/>
                                            <a href="https://devdylan.me" style="color:#ffffff;text-decoration:underline;">
                                                Unsubscribe from my email list.
                                            </a>
										</p>
									</td>
									<td style="padding:0;width:50%;" align="right">
										<table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
											<tr>
												<td style="padding:0 0 0 10px;width:38px;">
													<a href="http://www.twitter.com/TechDevDylan" style="color:#ffffff;">
														<img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;
														display:block;border:0;" />
													</a>
												</td>
												<td style="padding:0 0 0 10px;width:38px;">
													<a href="https://www.linkedin.com/in/dylanpoll/" style="color:#ffffff;">
														<img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" alt="linkdin" width="38" style="height:auto;
														display:block;border:0;" />
													</a>
												</td>
												<td style="padding:0 0 0 10px;width:38px;">
													<a href="https://github.com/dylanpoll" style="color:#ffffff;">
														<svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
															<path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
														</path></svg>
													</a>
												</td>											
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>
`;
return(emailBodyTemplate)
}