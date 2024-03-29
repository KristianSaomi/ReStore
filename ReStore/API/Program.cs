using API.Data;
using API.Mapping;
using API.Middleware;
using API.Services.IProductRepository;
using API.Services.ItemRepository;
using Microsoft.EntityFrameworkCore;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddAutoMapper(typeof(MapperProfile));
        builder.Services.AddTransient<ILogger>(s => s.GetService<ILogger<Program>>());

        //INFO: 
        //Singelton: Only one service isntanse is created and shared across all requests. - We need to be aware of the concurrency and threading issue
        //Scoped: One service instance is created for each request and reused throughout the request. - Request is considered as scope
        //Transient: A new service instance is created every time even if it is the same request. - Most common and always safest option if you are worried about multithread.

        //Repository
        builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
        builder.Services.AddScoped<IItemRepository, ItemRepository>();

        //DbContext
        builder.Services.AddDbContext<StoreContext>(opt =>
        {
            opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
        });

        builder.Services.AddCors();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        // -- being used in the background as a middleware: app.UseDeveloperExceptionPage();
        app.UseMiddleware<ExceptionMiddleware>();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(opt =>
        {
            opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
        });

        //app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();
        var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

        try
        {
            context.Database.Migrate();
            DbInitializer.Initialize(context);
            DbInitializer.itemInitlize(context);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "A problem occurred during migration");
        }

        app.Run();
    }
}