package com.stuara.colorblind;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferStrategy;

import javax.swing.JFrame;

public class Game extends Canvas implements Runnable {

	private static final long serialVersionUID = 1L;

	private Thread thread;
	private boolean running = false;

	public static void main(String[] args) {

		Game game = new Game();
		game.setPreferredSize(new Dimension(400, 400));
		game.setMinimumSize(new Dimension(400, 400));

		JFrame frame = new JFrame();
		frame.add(game);
		frame.pack();
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setResizable(false);
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);

		game.start();

	}

	public synchronized void start() {
		thread = new Thread(this);
		running = true;
		thread.start();
	}

	public synchronized void stop() {
		try {
			thread.join();
			running = false;
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void run() {

		long lastLoopTime = System.nanoTime();
		final int TARGET_FPS = 60;
		final long OPTIMAL_TIME = 1000000000 / TARGET_FPS;
		long lastFpsTime = 0;
		int fps = 0;

		while (running) {
			long now = System.nanoTime();
			long updateLength = now - lastLoopTime;
			lastLoopTime = now;
			double delta = updateLength / ((double)OPTIMAL_TIME);
			lastFpsTime += updateLength;
			fps++;

			if (lastFpsTime >= 1000000000) {
				System.out.println("(FPS: "+fps+")");
				lastFpsTime = 0;
				fps = 0;
			}

			update(delta);
			draw();

			long timeout = (lastLoopTime-System.nanoTime() + OPTIMAL_TIME)/1000000;

			if (timeout > 0) {
				try {
					Thread.sleep(timeout);
				}
				catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

	}

	public void update(double delta) {

		

	}

	public void draw() {

		BufferStrategy bs = this.getBufferStrategy();

		if (bs == null) {
			this.createBufferStrategy(2);
			return;
		}

		Graphics g = bs.getDrawGraphics();
		g.setColor(Color.blue);
		g.fillRect(0, 0, 400, 400);
		g.dispose();
		bs.show();

	}

}
