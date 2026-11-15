# YouthQuake admin mockup

Open `index.html` in a browser to explore the prototype. Bootstrap, Bootstrap Icons and fonts are loaded from CDNs; an internet connection is needed for those assets.

The overview, participant search, devotion and team-building group directories, check-in checklist, phone custody details and CSV downloads use 50 fictional participants. Open a group to see its members and check-in status, or open a member at the check-in desk. Check-in changes are stored in the browser's local storage and can be restored with **Reset demo**. Existing check-in changes from the original eight-person demo are retained when the sample roster is expanded. The signature checkbox confirms a paper signature; it does not capture one.

Each participant profile and participant CSV includes one workshop choice for each of three days, with three fictional workshop options per day. Existing single-workshop demo records are migrated: the previous choice becomes day 1 and sample choices are added for days 2 and 3. The workshop names and assignments are placeholders, not the actual camp programme.

The workshop directory shows rosters by day. Check-in supports participants without phones, missing shirts and other follow-up notes; outstanding shirt or follow-up items appear as **Needs attention** and can be filtered in the participant directory. Phone returns records collection and return times, allows corrections, and updates the custody count and CSV. Collection times from older demo records are shown as not recorded rather than guessed. Existing browser data is migrated without resetting check-in changes.

The activity log records check-in, checklist and follow-up changes, phone custody actions, edits to phone or follow-up details, and demo resets. Text edits record that a field was edited, not its contents. The newest 500 events are stored with the participant data in the current browser; older events are discarded. Resetting the demo retains the log and adds a reset event. Actions before the log was added cannot be reconstructed, and no staff identity is recorded. This is not a secure or shared audit trail.

This is a front-end demonstration, not a production registration system. It does not import Excel files, authenticate staff, synchronize devices, securely store data or provide a backend. Do not enter real participant information, phone details or emergency contacts.
