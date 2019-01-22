CANS Metrics in New Relic:

New Relic APM has most of our applications configured for each of our respective environments and you can browse all the apps through the link below:
https://rpm.newrelic.com/accounts/1481922/applications
There’s name search filter available to hunt down the desired app quickly. For CANS, we have these applications:

•	cans.preint.cwds.io
•	cans.integration.cwds.io
•	cans.preintdc.cwds.io
•	cans.staging.cwds.io
•	cans.performance.cwds.io
•	cans.preprod.cwds.io
•	cans.prod-dc.cwds.io

Now, let’s move on to New Relic Insights. This is where all the analytical side of things happen. Data is gathered and displayed to our end users via dashboards. You can first create a new dashboard and name it to reflect the app name as well the environment. For example, CANS Integration dashboard is named ‘CANS-Metrics-Integration’, something just like this.
You get routed to the newly created dashboard and all that’s left to do is to display the desired analytics. Run the NRQL (New Relic Query language) to gather and display the data on the query text box displayed on top of the page. Currently the desired base metrics we have for CANS are:
•	Assessments Pending
•	Assessments Complete
•	Number of Users Accessing CANS

Every time you run a new query in the query bar, it builds you a new chart, which you can tweak as desired. The query requires the app_name, which has to be defined in the New Relic Applications as discussed above. Below is the metric and the respective query for it, replace the application_name with a correct name from the New Relic Application list.


Assessments Pending:
SELECT uniqueCount(assessment_id) as 'number of assessments' FROM PageAction FACET assessment_county WHERE actionName = 'assessmentSave' and appName = 'application_name' SINCE 1 month ago LIMIT 60

Assessments Complete:
SELECT uniqueCount(assessment_id) as 'number of assessments' FROM PageAction FACET assessment_county WHERE actionName = 'assessmentSubmit' and appName = 'application_name' SINCE 1 month ago LIMIT 60

Number of Users Accessing CANS:
SELECT uniqueCount(staff_id) as '#Users' FROM PageAction FACET staff_county, dashboard where appName = 'cans.integration.cwds.io' SINCE 1 month ago limit 200

More NRQL queries. Time duration can be changed like 'SINCE 7 days ago', 'SINCE 1 hour ago' and so on. 
Number of Users Accessing CANS Since 1 day ago:
SELECT uniqueCount(staff_id) as '#Users' FROM PageAction FACET staff_county, dashboard where appName = 'cans.staging.cwds.io' SINCE 1 day ago limit 200

Assessments Pending Since 1 day ago:
SELECT uniqueCount(assessment_id) as 'number of assessments' FROM PageAction FACET assessment_county WHERE actionName = 'assessmentSave' and appName = 'cans.staging.cwds.io' SINCE 1 day ago LIMIT 60

Assessments Completed Since 1 day ago: 
SELECT uniqueCount(assessment_id) as 'number of assessments' FROM PageAction FACET assessment_county WHERE actionName = 'assessmentSubmit' and appName = 'cans.staging.cwds.io' SINCE 1 day ago LIMIT 60

Users Accessing CANS Dashboard Since 1 day ago:
SELECT staff_county, dashboard, staff_id as 'UserID' FROM PageAction where appName = 'cans.staging.cwds.io' SINCE 1 day ago limit 200

Frequency of Counties Accessing CANS Since 1 day ago:
SELECT count(*) as 'Frequency' FROM PageAction FACET staff_county where appName = 'cans.staging.cwds.io' SINCE 1 days ago limit 200

Frequency of Users Accessing CANS Since 1 day ago:
SELECT count(*) as 'Frequency' FROM PageAction FACET staff_id, staff_county where appName = 'cans.staging.cwds.io' SINCE 1 day ago limit 200


Friendly Reminder - The above metrics queries delivers us our base metrics which we have built upon the respective environments. Since these are prone to end user manipulation, we revert 'em metrics to the above, in case the metrics charts/tables gets messed up.
