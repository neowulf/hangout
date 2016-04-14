
....
install -d /usr/local
install -d /usr/local/bin
install -d /usr/local/man/man1
install -d /usr/local/etc
install -d /usr/local/lib
install -d /usr/local/share/examples/turnserver
install -d /usr/local/share/doc/turnserver
install -d /usr/local/share/turnserver
install -d /usr/local/include/turn
install bin/turnserver /usr/local/bin
install bin/turnadmin /usr/local/bin
install bin/turnutils_uclient /usr/local/bin
install bin/turnutils_peer /usr/local/bin
install bin/turnutils_stunclient /usr/local/bin
install man/man1/turnserver.1 /usr/local/man/man1/
install man/man1/turnadmin.1 /usr/local/man/man1/
install man/man1/turnutils.1 /usr/local/man/man1/
install man/man1/turnutils_uclient.1 /usr/local/man/man1/
install man/man1/turnutils_stunclient.1 /usr/local/man/man1/
install man/man1/turnutils_peer.1 /usr/local/man/man1/
install man/man1/rfc5766-turn-server.1 /usr/local/man/man1/
install lib/libturnclient.a /usr/local/lib
install LICENSE /usr/local/share/doc/turnserver
install README.turnutils /usr/local/share/doc/turnserver
install INSTALL /usr/local/share/doc/turnserver
install postinstall.txt /usr/local/share/doc/turnserver
install turndb/schema.sql /usr/local/share/doc/turnserver
install turndb/schema.sql /usr/local/share/turnserver
install turndb/testredisdbsetup.sh /usr/local/share/turnserver
install turndb/schema.userdb.redis /usr/local/share/doc/turnserver
install turndb/schema.userdb.redis /usr/local/share/turnserver
install turndb/schema.stats.redis /usr/local/share/doc/turnserver
install turndb/schema.stats.redis /usr/local/share/turnserver
install examples/etc/turnserver.conf /usr/local/etc/turnserver.conf.default
install examples/etc/turnuserdb.conf /usr/local/etc/turnuserdb.conf.default
cp -rpf examples/etc /usr/local/share/examples/turnserver
cp -rpf examples/scripts /usr/local/share/examples/turnserver
rm -rf /usr/local/share/examples/turnserver/scripts/rfc5769.sh
cp -rpf include/turn/client /usr/local/include/turn
install include/turn/ns_turn_defs.h /usr/local/include/turn
more /usr/local/share/doc/turnserver/postinstall.txt
==================================================================

1) If you system supports automatic start-up system daemon services,
the, to enable the turnserver as an automatically started system
service, you have to:

        a) Create and edit /etc/turnserver.conf or
        /usr/local/etc/turnserver.conf .
        Use /usr/local/etc/turnserver.conf.default as an example.

        b) For user accounts settings, if using the turnserver
        with authentication: create and edit /etc/turnuserdb.conf
        file, or set up PostgreSQL or MySQL or Redis database for user accounts.
        Use /usr/local/etc/turnuserdb.conf.default as example for flat file DB,
        or use /usr/local/share/turnserver/schema.sql as SQL database schema,
        or use /usr/local/share/turnserver/schema.userdb.redis as Redis
        database schema description and/or /usr/local/share/turnserver/schema.stats.redis
        as Redis status & statistics database schema description.

        c) add whatever is necessary to enable start-up daemon for the /usr/local/bin/turnserver.

2) If you do not want the turnserver to be a system service,
   then you can start/stop it "manually", using the "turnserver"
   executable with appropriate options (see the documentation).

3) To create database schema, use schema in file /usr/local/share/turnserver/schema.sql.

4) For additional information, run:

   $ man turnserver
   $ man turnadmin
   $ man turnutils